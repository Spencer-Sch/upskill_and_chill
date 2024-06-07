'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'

const Todo = () => {
	const [task, setTask] = useState<Task>({
		taskName: '',
		description: '',
		priority: 1,
		createdAt: 0,
		// deadline:  '',
		id: Math.floor(Math.random() * 1000),
		completed: false,
	})
	console.log('handleChange: ', task)

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
		</div>
	)
}

export default Todo
