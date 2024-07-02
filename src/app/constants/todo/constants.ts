export const priorityOptions: PriorityOption[] = [
	{
		label: 'High',
		value: 3,
	},
	{
		label: 'Medium',
		value: 2,
	},
	{
		label: 'Low',
		value: 1,
	},
]

// export const priorityOptionsMap: { [key: number]: string } = {
// 	1: 'Low',
// 	2: 'Medium',
// 	3: 'High',
// }

export function createPriorityMap() {
	const map: { [key: number]: string } = {}
	priorityOptions.forEach((item: PriorityOption) => {
		map[item.value] = item.label
	})
	return map
}
