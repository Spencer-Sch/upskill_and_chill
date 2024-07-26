import { priorityMap } from '@/app/constants/todo/constants'

interface TaskProps {
	taskData: Task
	deleteTask: (id: string) => void
}

const Task = ({
	taskData: { taskName, description, id, priority, completed, createdAt },
	deleteTask,
}: TaskProps) => {
	return (
		<li className="p-5 bg-lightBlue rounded-md">
			<h3 className="text-lg font-bold">{taskName}</h3>
			<p>{description}</p>
			<p>{priorityMap.get(priority)}</p>
			{/* <p>{completed.toString()}</p> */}
			<p>{createdAt}</p>
			<button
				className="hover:bg-secondary-600 py-2 px-5 rounded-md bg-secondary-500"
				onClick={() => deleteTask(id ?? '')}
			>
				Delete
			</button>
		</li>
	)
}

export default Task
