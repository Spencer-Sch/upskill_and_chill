'use client'
import { ReactElement, ReactNode } from 'react'

interface ButtonProps {
	style?: 'primay' | 'secondary'
	onClick?: (...args: any[]) => void
	type?: 'button' | 'submit' | 'reset' | undefined
	label?: string
	icon?: ReactElement | null
	iconPosition?: 'left' | 'right'
}

type Field = { [key: string]: any }

type OtherProps = ButtonProps & Field

export default function Button({
	style,
	onClick,
	type,
	label,
	icon,
	iconPosition = 'left',
	...props
}: OtherProps) {
	return (
		<button
			type={type}
			className="flex justify-center items-center space-x-2 hover:bg-secondary-600 py-2 rounded-md bg-secondary-500"
			onClick={onClick ? onClick : () => {}}
			{...props}
		>
			{iconPosition === 'left' && icon}
			<span>{label}</span>
			{iconPosition === 'right' && icon}
		</button>
	)
}
