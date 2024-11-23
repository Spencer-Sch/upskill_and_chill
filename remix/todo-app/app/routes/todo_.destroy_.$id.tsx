import type { ActionFunctionArgs } from '@remix-run/node'
import { deleteTask } from '~/actions/todo-actions'

export const action = async ({ params }: ActionFunctionArgs) => {
	return await deleteTask(params.id ?? '')
}
