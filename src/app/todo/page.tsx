'use client'
import React, { useState, ChangeEvent } from 'react'

const Todo = () => {
	const [taskData, setTaskData] = useState({ taskName: '', taskBody: '' })

	// Start next stream talking about updated event type
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskData((prev) => ({ ...prev, taskBody: e.target.value }))
	}
	// console.log("handleChange: ", taskData);

	const handleSubmit = (e: any) => {
		e.preventDefault()
	}

	return (
		<div>
			This works
			<form onSubmit={handleSubmit}>
				<label htmlFor="task-name">Task Name</label>
				<input
					type="text-name"
					name="task-name"
					id="task-name"
					className="border-[1px]"
				/>
				<label htmlFor="task-body">Task Body</label>
				<input
					type="task-body"
					name="task-body"
					id="task-body"
					className="border-[1px]"
					onChange={handleChange}
					value={taskData.taskBody}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	)
}

export default Todo
