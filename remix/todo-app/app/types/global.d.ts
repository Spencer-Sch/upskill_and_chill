export {}
declare global {
	type Task = {
		taskName: string
		description: string | null
		priority: number
		createdAt?: string
		// deadline?: string,
		id: string
		completed: boolean
	}
	type PriorityOption = {
		label: string
		value: number
	}
}
