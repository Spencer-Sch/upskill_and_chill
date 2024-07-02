import { createPriorityMap } from '@/app/constants/todo/constants'

interface TaskProps {
	taskData: Task
}

const Task = ({
	taskData: { taskName, description, id, priority, completed, createdAt },
}: TaskProps) => {
	function getPriority() {
		// something here should be memoized with useMemo to prevent
		// recalculated this static object on every render
		const priorityMap = createPriorityMap()
		return priorityMap[priority]
	}

	return (
		<li className="p-5 bg-lightBlue rounded-md">
			<h3 className="text-lg font-bold">{taskName}</h3>
			<p>{description}</p>
			<p>{getPriority()}</p>
			{/* <p>{completed.toString()}</p> */}
			<p>{createdAt}</p>
		</li>
	)
}

export default Task
