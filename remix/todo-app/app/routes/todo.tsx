import { Suspense } from 'react'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prisma } from '../../prisma/client'
import Task from '../components/Task'


export const loader = async () => {
  const tasks: Task[] = await prisma.task.findMany()
  return json(tasks)
}

export default function Todo() {
  const tasks = useLoaderData<typeof loader>()
  return (
    <div className="bg-primary-400 flex space-x-10 w-fit rounded-md">
			<div className="p-10">
				{/* <TodoForm /> */}
			</div>
			<div className="p-10">
				<ul className="space-y-3 max-h-[700px] overflow-y-scroll pr-5">
					<Suspense fallback={<div>Loading...</div>}>
						{tasks.map(task => (
							<Task key={task.id} taskData={task} />
						))}
					</Suspense>
				</ul>
			</div>
		</div>
  )
}