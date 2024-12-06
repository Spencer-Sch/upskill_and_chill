import { redirect } from '@remix-run/node'
import { getSession } from '~/services/session.server'

export async function requireAuth(request: Request) {
	const session = await getSession(request)
	const userId = session.get('user_id')

	if (!userId) {
		throw redirect('/login')
	}

	return userId
}
