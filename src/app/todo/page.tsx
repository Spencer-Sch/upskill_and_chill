import React, {
	// useState, ChangeEvent, FormEvent, useEffect,
	Suspense,
} from 'react'
import Task from '../components/todo/Task'
import { priorityOptions } from '../constants/todo/constants'
import TextInput from '../components/todo/TextInput'
import { addTask } from '@/app/lib/actions'
import Button from '../components/todo/Button'
import { Trash } from '@/app/components/third-party/icons'

const defaultTask: Task = {
	taskName: '',
	description: '',
	priority: 1,
	// deadline:  '',
	completed: false,
}

const Todo = async () => {
	// const [tasks, setTasks] = useState<Task[]>([])
	// const [task, setTask] = useState<Task>(defaultTask)
	// console.log('handleChange: ', task)

	// useEffect(() => {
	// 	getTasks()
	// }, [])

	const getTasks = async () => {
		'use server'
		try {
			console.log('get tasks')
			const res = await fetch('http://localhost:3000/api/task')
			// console.log('==res==', res)
			const data = await res.json()
			// console.log('==data==', data)
			// setTasks(data)
			return data
		} catch (error) {
			console.error(error)
		}
	}

	const tasks = await getTasks()
	// console.log(tasks)

	// const deleteTask = async (id: string) => {
	// 	'use server'
	// 	try {
	// 		const res = await fetch(`/api/task/${id}`, { method: 'DELETE' })
	// 		if (res.ok) {
	// 			getTasks()
	// 		}
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }

	// console.log('Tasks: ', tasks)
	// Start next stream talking about updated event type
	// const handleChange = (
	// 	e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	// ) => {
	// 	let value: (typeof task)[keyof typeof task] = e.target.value
	// 	if (e.target.id === 'priority') {
	// 		value = Number(value)
	// 	}
	// 	setTask({ ...task, [e.target.id]: value })
	// }

	// const handleSubmit = async (e: FormEvent) => {
	// 	e.preventDefault()
	// 	const newTask = task
	// 	// newTask.createdAt = Date.now()

	// 	try {
	// 		const res = await fetch('/api/task', {
	// 			method: 'POST',
	// 			body: JSON.stringify(newTask),
	// 		})

	// 		console.log('Task created successfully', res)

	// 		if (res.ok) {
	// 			getTasks()
	// 			setTask(defaultTask)
	// 		}
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }

	return (
		<div className="bg-primary-400 flex space-x-10 w-fit rounded-md">
			<div className="p-10">
				<form
					// onSubmit={handleSubmit}
					action={addTask}
					className="flex flex-col space-y-5"
				>
					<TextInput
						inputName="taskName"
						label="Task"
						// value={task.taskName}
						// onChangeCallback={handleChange}
					/>
					<TextInput
						inputType="textarea"
						inputName="description"
						label="Description"
						// value={task.description ?? ''}
						// onChangeCallback={handleChange}
					/>
					<div className="flex flex-col">
						<label htmlFor="priority">Priority</label>
						<select
							id="priority"
							name="priority"
							// value={task.priority}
							// onChange={handleChange}
						>
							{priorityOptions.map((item) => (
								<option key={item.value} value={item.value}>
									{item.label}
								</option>
							))}
						</select>
					</div>
					<Button label="Submit" type="submit" />
				</form>
			</div>
			<div className="p-10">
				<ul className="space-y-3">
					<Suspense fallback={<div>Loading...</div>}>
						{tasks.map((task: Task) => (
							<Task key={task.id} taskData={task} />
						))}
					</Suspense>
				</ul>
			</div>
		</div>
	)
}

export default Todo
