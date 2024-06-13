export {}
declare global {
	type Task = {
		taskName: string
		description?: string
		priority: number
		createdAt?: string
		// deadline?: string,
		id?: string
		completed: boolean
	}
}
