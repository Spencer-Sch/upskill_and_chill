export const priorityMap = new Map([
	[1, 'Low'],
	[2, 'Medium'],
	[3, 'High'],
])
// here we format data into Map data type
// I chose a Map because it was easy to convert into
// either an array of objects or an object itself

export const priorityOptions = Array.from(priorityMap, ([value, label]) => ({
	value,
	label,
}))
// This (single line yay!) creates an array of objects with
// a value and label like we originally had on the Todo page

export const linksMap = new Map([
	['home', { label: 'Home', path: '/' }],
	['todo-app', { label: 'Todo App', path: '/todo' }],
])

export const links = Array.from(linksMap, ([key, { label, path }]) => ({
	label,
	path,
}))
