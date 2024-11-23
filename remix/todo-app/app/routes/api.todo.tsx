import { ActionFunctionArgs } from '@remix-run/node'
// import { prisma } from "~/prisma/client";
import { createTask } from '~/actions/todo-actions'

// export const loader = async () => {
//   const tasks: Task[] = await prisma.task.findMany();
//   return json(tasks);
// };

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	return createTask(formData)
}
