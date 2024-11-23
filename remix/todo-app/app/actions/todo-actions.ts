// import { randomUUID } from "crypto";
import { prisma } from '~/prisma/client'
import { supabase } from '~/supabase/client'

export const createTask = async (formData: FormData) => {
	const taskName = String(formData.get('taskName'))
	const description = String(formData.get('description'))
	const priority = Number(formData.get('priority'))
	// const createdAt = Date.now().toString();
	// const id = randomUUID();
	// const newTask = prisma.task.create({
	//   data: {
	//     taskName,
	//     description,
	//     priority,
	//     id,
	//     createdAt,
	//     completed: false,
	//   },
	// });
	// return newTask;
	const { data, error } = await supabase.from('tasks').insert({
		taskName,
		description,
		priority,
	})
	if (error) return { error }
	return data
}

export const deleteTask = async (id: string) => {
	if (id === '') return 'No id provided'
	const deletedTask = prisma.task.delete({
		where: {
			id,
		},
	})
	return deletedTask
}
