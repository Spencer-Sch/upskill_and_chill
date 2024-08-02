import { format } from 'date-fns'

interface TaskProps {
	taskData: Task
	deleteTask: (id: string) => void
}

const Task = ({
	taskData: { taskName, description, id, priority, completed, createdAt },
	deleteTask,
}: TaskProps) => {
	const getPriorityColor = (priority: number) => {
		const map: { [key: number]: string } = {
			3: 'border-red-500',
			2: 'border-yellow-500',
			1: 'border-grey-500',
		}
		return map[priority]
	}
	return (
		<li
			className={`${getPriorityColor(priority)} p-5 bg-lightBlue rounded-md border-l-4 border-solid`}
		>
			<h3 className="text-lg font-bold">{taskName}</h3>
			<p>{description}</p>
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
