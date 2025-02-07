import { useState, useCallback } from 'react'
import { z } from 'zod'
import type { FieldValues, FieldErrors, FormState } from '~/types/types'

export function useForm<T extends FieldValues>(options: {
	schema: z.ZodObject<z.ZodRawShape, any, T>
	defaultValues?: Partial<T>
}) {
	const [formState, setFormState] = useState<FormState<T>>({
		values: options.defaultValues || {},
		errors: {},
		touched: {},
		isSubmitting: false,
		isValid: false,
	})

	const validateField = useCallback(
		(name: keyof T, value: any) => {
			try {
				// const fieldSchema = options.schema.
				const fieldSchema = options.schema.shape[name]
				fieldSchema.parse(value)
				return []
			} catch (error) {
				if (error instanceof z.ZodError) {
					return error.errors.map((err) => err.message)
				}
				return ['Invalid value']
			}
		},
		[options.schema]
	)

	const register = useCallback(
		(name: keyof T) => ({
			name,
			value: formState.values[name] || '',
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
				const value = e.target.value
				const errors = validateField(name, value)

				setFormState((prev) => ({
					...prev,
					values: { ...prev.values, [name]: value },
					errors: { ...prev.errors, [name]: errors },
					touched: { ...prev.touched, [name]: true },
				}))
			},
			onBlur: () => {
				setFormState((prev) => ({
					...prev,
					touched: { ...prev.touched, [name]: true },
				}))
			},
		}),
		[formState, validateField]
	)

	const handleSubmit = useCallback(
		(onSubmit: (values: T) => Promise<void>) => async (e: React.FormEvent) => {
			e.preventDefault()

			setFormState((prev) => ({ ...prev, isSubmitting: true }))

			try {
				const validatedData = await options.schema.parseAsync(formState.values)
				await onSubmit(validatedData)
			} catch (error) {
				if (error instanceof z.ZodError) {
					const errors: FieldErrors<T> = {}
					error.errors.forEach((err) => {
						const path = err.path[0] as keyof T
						if (!errors[path]) errors[path] = []
						errors[path]!.push(err.message)
					})

					setFormState((prev) => ({
						...prev,
						errors,
						isValid: false,
					}))
				}
			} finally {
				setFormState((prev) => ({ ...prev, isSubmitting: false }))
			}
		},
		[formState.values, options.schema]
	)

	return {
		register,
		handleSubmit,
		formState,
	}
}
