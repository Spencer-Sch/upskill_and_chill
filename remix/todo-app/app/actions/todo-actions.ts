// import { randomUUID } from "crypto";
import { prisma } from '~/prisma/client'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/supabase/database.types'


export const createTask = async (formData: FormData, supabase: SupabaseClient) => {
	const { data: { user } } = await supabase.auth.getUser()
	if (!user) return 'No User found'
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
		user_id: user.id
	})
	if (error) return { error }
	return data
}

export const deleteTask = async (id: string, supabase: SupabaseClient) => {
	// if (id === '') return 'No id provided'
	// const deletedTask = prisma.task.delete({
	// 	where: {
	// 		id,
	// 	},
	// })
	const { error } = await supabase.from('tasks').delete().eq('id', id)
	if (error) return { error }

	console.log(`Successfully Deleted task ${id}`)
	return { status: 204 }
}
