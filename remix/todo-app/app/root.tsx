import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react'
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import {
	getSession,
	getAuthenticatedSupabaseClient,
} from '~/services/session.server'

import './tailwind.css'
import Header from '~/components/Header'

export const links: LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
	},
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request)
	const accessToken = session.get('access_token')

	if (!accessToken) {
		return json({ user: null })
	}

	const supabase = await getAuthenticatedSupabaseClient(request)
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser()

	if (error || !user) {
		// Clear session if authentication fails
		return redirect('/login', {
			headers: {
				'Set-Cookie': await sessionStorage.destroySession(session),
			},
		})
	}
	console.log('Root user: ', user)

	return json({ user })
}

export function Layout({ children }: { children: React.ReactNode }) {
	const { user } = useLoaderData<typeof loader>()

	const userStatus = () => {
		if (user) {
			return true
		}
		return false
	}

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="bg-primaryBg">
				<div className="flex flex-col h-screen">
					<Header isLoggedIn={userStatus()} />
					<div className="h-full flex justify-center items-center">
						{children}
					</div>
				</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return <Outlet />
}
