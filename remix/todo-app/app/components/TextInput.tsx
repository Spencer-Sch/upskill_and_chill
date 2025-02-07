'use client'
import { ChangeEvent } from 'react'

// interface TextInputProps {
// 	inputName: string
// 	label: string
// 	value?: string
// 	placeholder?: string
// 	// styles?: string
// 	inputType?: 'text' | 'textarea' | 'password' | 'email'
// 	required?: boolean
// 	onChangeCallback?: (
// 		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
// 	) => void
// }

type TextInputProps = {
	inputName: string
	label: string
	value?: string
	placeholder?: string
	// styles?: string
	inputType?: 'text' | 'textarea' | 'password' | 'email'
	required?: boolean
	// onChangeCallback?: (
	// 	e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	// ) => void
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>

const TextInput = ({
	inputName,
	label,
	value,
	placeholder = '',
	// styles,
	inputType = 'text',
	required,
	// onChangeCallback,
	...rest
}: TextInputProps) => {
	return (
		<div className="flex flex-col">
			<label htmlFor={inputName} className="text-orange font-bold">
				{label}
			</label>
			{inputType === 'textarea' ? (
				<textarea
					name={inputName}
					id={inputName}
					value={value}
					className="common-input"
					// onChange={onChangeCallback}
					placeholder={placeholder}
					required={required}
					rows={8}
					cols={15}
					{...rest}
				/>
			) : (
				<input
					name={inputName}
					id={inputName}
					value={value}
					className="common-input"
					// onChange={onChangeCallback}
					type={inputType}
					placeholder={placeholder}
					required={required}
					{...rest}
				/>
			)}
		</div>
	)
}

export default TextInput
