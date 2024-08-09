import { format } from 'date-fns'
import Trash from '@/app/components/third-party/trash'

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
			<div className="flex justify-between items-center w-full mt-3">
				<p className="text-grey-500 italic">
					{format(new Date(Number(createdAt)) ?? '', 'MM/dd/yyyy')}
				</p>
				<button
					className="p-1.5 rounded-md transition-colors duration-200 hover:bg-red-500 hover:bg-opacity-80 hover:text-white"
					onClick={() => deleteTask(id ?? '')}
					aria-label="delete task"
				>
					<Trash size={17} />
				</button>
			</div>
		</li>
	)
}

export default Task
