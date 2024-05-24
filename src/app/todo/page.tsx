'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'

const Todo = () => {
	const [task, setTask] = useState<Todo>()
	// console.log("handleChange: ", taskData);

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
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTask((prev) => ({ ...prev, taskBody: e.target.value }))
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
	}

	// !!Turn this into a type!!
	/* Task Shape
	 * Item Task Name (required) - string
	 * Description (optional) - string
	 * Priority Level (optional) - number
	 * Creation Date (auto) - date (string)
	 * Due Date/Deadline (optional?) - date (string)
	 * Completed (default false) - boolean
	 */

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Task Name</label>
				<input name="name" id="name" className="border-[1px]" />

				<label htmlFor="description">Task Description</label>
				<input
					name="description"
					id="description"
					className="border-[1px]"
					onChange={handleChange}
				/>

				<label htmlFor="priority">Task Description</label>
				<select id="priority">
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
