import type { ActionFunctionArgs } from '@remix-run/node'
import { deleteTask } from '~/actions/todo-actions'
import { getAuthenticatedSupabaseClient } from '~/services/session.server'


export const action = async ({ params, request }: ActionFunctionArgs) => {
	const supabase = await getAuthenticatedSupabaseClient(request)
	return await deleteTask(params.id as string, supabase)
}
