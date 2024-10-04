'use client'
import { useRef, useState } from 'react'
import { priorityOptions } from '../../constants/todo/constants'
import TextInput from './TextInput'
import Button from './Button'
import { addTask } from '../../lib/actions'
import { SpinnerGap } from '../third-party/icons'

const TodoForm = () => {
	const [loading, setLoading] = useState(false)
	const form = useRef<HTMLFormElement>(null)

	// console.log('loading: ', loading)

	const handleSubmit = async (formData: FormData) => {
		setLoading(true)
		try {
			await addTask(formData)
			form.current?.reset()
		} catch (e) {
			console.error(e)
			setLoading(false)
		} finally {
			setLoading(false)
		}
	}

	return (
		// <form ref={form} action={handleSubmit} className="flex flex-col space-y-5">
		<form
			ref={form}
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit(new FormData(form.current!))
			}}
			className="flex flex-col space-y-5"
		>
			<TextInput inputName="taskName" label="Task" />
			<TextInput
				inputType="textarea"
				inputName="description"
				label="Description"
			/>
			<div className="flex flex-col">
				<label htmlFor="priority">Priority</label>
				<select id="priority" name="priority">
					{priorityOptions.map((item) => (
						<option key={item.value} value={item.value}>
							{item.label}
						</option>
					))}
				</select>
			</div>
			<Button
				type="submit"
				label={loading ? '' : 'Submit'}
				icon={loading ? <SpinnerGap /> : null}
				disabled={loading}
			/>
		</form>
	)
}

export default TodoForm
