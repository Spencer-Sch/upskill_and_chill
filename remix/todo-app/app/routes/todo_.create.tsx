import type { ActionFunctionArgs } from '@remix-run/node'
import { createTask } from '~/actions/todo-actions'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	return await createTask(formData)
}
