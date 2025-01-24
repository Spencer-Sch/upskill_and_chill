export type FieldValues = Record<string, any>

export type FieldErrors<T extends FieldValues> = {
	[K in keyof T]?: string[]
}

export type FormState<T extends FieldValues> = {
	values: Partial<T>
	errors: FieldErrors<T>
	touched: Partial<Record<keyof T, boolean>>
	isSubmitting: boolean
	isValid: boolean
}
