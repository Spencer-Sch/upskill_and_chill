import { priorityOptionsMap } from '@/app/constants/todo/constants'

interface TaskProps {
	taskData: Task
}

const Task = ({
	taskData: { taskName, description, id, priority, completed, createdAt },
}: TaskProps) => {
	console.log(completed)
	return (
		<li className="p-5 bg-lightBlue rounded-md">
			<h3 className="text-lg font-bold">{taskName}</h3>
			<p>{description}</p>
			<p>{priorityOptionsMap[priority]}</p>
			{/* <p>{completed.toString()}</p> */}
			<p>{createdAt}</p>
		</li>
	)
}

export default Task