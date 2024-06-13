'use client'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'

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

	const priorityOptions = [
		{
			label: 'High',
			value: 3,
		},
		{
			label: 'Medium',
			value: 2,
		},
		{
			label: 'Low',
			value: 1,
		},
	]

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
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="taskName">Task</label>
				<input
					name="taskName"
					id="taskName"
					className="border-[1px]"
					onChange={handleChange}
				/>

				<label htmlFor="description">Description</label>
				<input
					name="description"
					id="description"
					className="border-[1px]"
					onChange={handleChange}
				/>

				<label htmlFor="priority">Priority</label>
				<select id="priority" defaultValue={1} onChange={handleChange}>
					{priorityOptions.map((item) => (
						<option key={item.value} value={item.value}>
							{item.label}
						</option>
					))}
				</select>

				<button type="submit">Submit</button>
			</form>
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
	)
}

export default Todo
