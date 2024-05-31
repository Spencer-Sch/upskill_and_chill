export {}
declare global {
	type Task = {
		name: string
		description?: string
		priority: number
		createdAt: string
		// deadline?: string,
		completed: boolean
	}
}
