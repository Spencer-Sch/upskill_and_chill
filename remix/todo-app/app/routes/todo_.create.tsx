import type { ActionFunctionArgs } from '@remix-run/node'
import { createTask } from '~/actions/todo-actions'
import { getAuthenticatedSupabaseClient } from '~/services/session.server'


export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const supabase = await getAuthenticatedSupabaseClient(request)

	return await createTask(formData, supabase)
}
