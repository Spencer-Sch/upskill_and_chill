'use client'
import { ChangeEvent } from 'react'

interface TextInputProps {
	inputName: string
	label: string
	value?: string
	placeholder?: string
	// styles?: string
	inputType?: 'text' | 'textarea' | 'password' | 'email'
	onChangeCallback?: (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => void
}

const TextInput = ({
	inputName,
	label,
	value,
	placeholder = '',
	// styles,
	inputType = 'text',
	onChangeCallback,
}: TextInputProps) => {
	return (
		<div className="flex flex-col">
			<label htmlFor={inputName}>{label}</label>
			{inputType === 'textarea' ? (
				<textarea
					name={inputName}
					id={inputName}
					value={value}
					className="border-[1px]"
					onChange={onChangeCallback}
					placeholder={placeholder}
					rows={8}
					cols={15}
				/>
			) : (
				<input
					name={inputName}
					id={inputName}
					value={value}
					className="border-[1px]"
					onChange={onChangeCallback}
					type={inputType}
					placeholder={placeholder}
				/>
			)}
		</div>
	)
}

export default TextInput
