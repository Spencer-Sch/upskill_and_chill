'use client'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { priorityOptions } from '../constants/todo/constants'

const Todo = () => {
	const [tasks, setTasks] = useState<Task[]>([])
	const [task, setTask] = useState<Task>({
		taskName: '',
		description: '',
		priority: 1,
		// deadline:  '',
		completed: false,
	})
	console.log('handleChange: ', task)

	useEffect(() => {
		getTasks()
	}, [])

	const getTasks = async () => {
		try {
			const res = await fetch('/api/task')
			const data = await res.json()
			setTasks(data)
		} catch (error) {
			console.error(error)
		}
	}

	console.log('Tasks: ', tasks)

	// Start next stream talking about updated event type
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		let value: (typeof task)[keyof typeof task] = e.target.value
		if (e.target.id === 'priority') {
			value = Number(value)
		}
		setTask({ ...task, [e.target.id]: value })
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const newTask = task
		// newTask.createdAt = Date.now()

		try {
			const res = await fetch('/api/task', {
				method: 'POST',
				body: JSON.stringify(newTask),
			})

			console.log('Task created successfully', res)

			if (res.ok) {
				getTasks()
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="bg-primary-400 flex space-x-10 w-fit">
			<div className="p-16">
				<form onSubmit={handleSubmit} className="flex flex-col space-y-10">
					<div className="flex flex-col">
						<label htmlFor="taskName">Task</label>
						<input
							name="taskName"
							id="taskName"
							className="border-[1px]"
							onChange={handleChange}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="description">Description</label>
						<input
							name="description"
							id="description"
							className="border-[1px]"
							onChange={handleChange}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="priority">Priority</label>
						<select id="priority" defaultValue={1} onChange={handleChange}>
							{priorityOptions.map((item) => (
								<option key={item.value} value={item.value}>
									{item.label}
								</option>
							))}
						</select>
					</div>
					<button
						type="submit"
						className="hover:bg-secondary-600 py-2 rounded-md bg-secondary-500"
					>
						Submit
					</button>
				</form>
			</div>
			<div className="">
				<ul>
					{tasks.map((task: Task) => (
						<li key={task.id}>
							<p>Task Name: {task.taskName}</p>
							<p>Description: {task.description}</p>
							<p>Priority: {task.priority}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Todo
