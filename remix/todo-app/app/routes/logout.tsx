import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { getSession, sessionStorage, supabase } from '~/services/session.server'

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request)
	await supabase.auth.signOut()

	return redirect('/login', {
		headers: {
			'Set-Cookie': await sessionStorage.destroySession(session),
		},
	})
}
