import React, { Suspense } from 'react'
import Task from '../components/todo/Task'
import { priorityOptions } from '../constants/todo/constants'
import TextInput from '../components/todo/TextInput'
import { getTasks, addTask } from '@/app/lib/actions'
import Button from '../components/todo/Button'

// const defaultTask: Task = {
// 	id: '',
// 	taskName: '',
// 	description: '',
// 	priority: 1,
// 	// deadline:  '',
// 	completed: false,
// }

const Todo = async () => {

	const tasks = await getTasks()

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
				<ul className="space-y-3 max-h-[700px] overflow-y-scroll pr-5">
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
