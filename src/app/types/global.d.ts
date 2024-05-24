export {}
declare global {
	type Todo = {
		name: string
		description?: string
		priority: number
		createdAt: string
		// deadline?: string,
		completed: boolean
	}
}
