'use client'
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { getSession, sessionStorage, supabase } from '~/services/session.server'
import Button from '~/components/Button'
import TextInput from '~/components/TextInput'
import { createClient } from '@supabase/supabase-js'
import { useForm } from '~/hooks/useForm'
import { z } from 'zod'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request)
	const accessToken = session.get('access_token')

	// If user has an access token, verify it's still valid
	if (accessToken) {
		const supabaseClient = createClient(
			process.env.SUPABASE_URL!,
			process.env.SUPABASE_ANON!
		)

		// Set the session to verify the token
		supabaseClient.auth.setSession({
			access_token: accessToken,
			refresh_token: session.get('refresh_token'),
		})

		const {
			data: { user },
			error,
		} = await supabaseClient.auth.getUser()

		// If token is valid and user exists, redirect to todo page
		if (!error && user) {
			return redirect('/todo')
		}

		// If token is invalid, destroy the session
		return redirect('/login', {
			headers: {
				'Set-Cookie': await sessionStorage.destroySession(session),
			},
		})
	}

	// If no token exists, allow access to login page
	return json({ isAuthenticated: false })
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const email = formData.get('email')
	const password = formData.get('password')

	const { data, error } = await supabase.auth.signInWithPassword({
		email: String(email),
		password: String(password),
	})

	if (error) {
		return json({ error: error.message })
	}

	if (data?.session) {
		// Create new session
		const session = await sessionStorage.getSession()
		session.set('access_token', data.session.access_token)
		session.set('refresh_token', data.session.refresh_token)
		session.set('user_id', data.session.user.id)

		return redirect('/todo', {
			headers: {
				'Set-Cookie': await sessionStorage.commitSession(session),
			},
		})
	}

	return json({ error: 'An unexpected error occurred' })
}

export default function Screen() {
	const loginSchema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
		// confirmPassword: z.string(),
	})
	// .refine((data) => data.password === data.confirmPassword, {
	// 	message: "Passwords don't match",
	// 	path: ['confirmPassword'],
	// })

	type LoginForm = z.infer<typeof loginSchema>

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginForm>({
		schema: loginSchema,
		defaultValues: {
			email: '',
			password: '',
			// confirmPassword: '',
		},
	})

	const onSubmit = async (data: LoginForm) => {
		// Handle form submission
		console.log(data)
	}

	return (
		<Form
			method="post"
			className="flex flex-col justify-center items-center space-y-10"
			onSubmit={handleSubmit(onSubmit)}
		>
			<TextInput inputName="email" label="Email" required />
			<TextInput
				{...register('password')}
				inputName="password"
				label="Password"
				inputType="password"
				required
			/>
			<Button label="Sign In" fullWidth />
		</Form>
	)
}
