export default function Todo() {
  return (
    <div className="bg-primary-400 flex space-x-10 w-fit rounded-md">
			<div className="p-10">
				{/* <TodoForm /> */}
			</div>
			<div className="p-10">
				<ul className="space-y-3 max-h-[700px] overflow-y-scroll pr-5">
					{/* <Suspense fallback={<div>Loading...</div>}>
						{tasks.map((task: Task) => (
							<Task key={task.id} taskData={task} />
						))}
					</Suspense> */}
				</ul>
			</div>
		</div>
  )
}