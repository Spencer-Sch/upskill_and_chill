import { format } from 'date-fns'

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
				<p className="text-grey-500 italic">
					{format(new Date(Number(createdAt)) ?? '', 'MM/dd/yyyy')}
				</p>
			>
				Delete
			</button>
		</li>
	)
}

export default Task
