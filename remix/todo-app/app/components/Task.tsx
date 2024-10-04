// import { format } from 'date-fns'
// import { Trash } from '../third-party/icons'
// import IconButton from './IconButton'
// import { deleteTask } from '../../lib/actions'

interface TaskProps {
	taskData: Task
}

const Task = ({
	taskData: { taskName, description, id, priority, completed, createdAt },
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
			className={`${getPriorityColor(
				priority
			)} max-w-[350px] min-w-[350px] p-5 bg-lightBlue rounded-md border-l-4 border-solid`}
		>
			<h3 className="text-lg break-words">{taskName}</h3>
			<p>{description}</p>
			<div className="flex justify-between items-center w-full mt-3">
				<p className="text-grey-500 italic">
					{/* {format(new Date(Number(createdAt)) ?? '', 'MM/dd/yyyy')} */}
				</p>
				{/* <form action={deleteTask}>
					<input hidden defaultValue={id ?? ''} name="taskId" />
					<IconButton icon={<Trash size={17} />} ariaLabel="delete task" />
				</form> */}
			</div>
		</li>
	)
}

export default Task
