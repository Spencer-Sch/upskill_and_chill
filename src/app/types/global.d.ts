export {}
declare global {
	type Task = {
		taskName: string
		description?: string
		priority: number
		createdAt?: number
		// deadline?: string,
		id?: number
		completed: boolean
	}
}
