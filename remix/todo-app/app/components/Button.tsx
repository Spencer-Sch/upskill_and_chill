'use client'
import { ReactElement, ReactNode } from 'react'

interface ButtonProps {
	style?: 'primay' | 'secondary'
	onClick?: (...args: any[]) => void
	type?: 'button' | 'submit' | 'reset' | undefined
	label?: string
	icon?: ReactElement | null
	fullWidth?: boolean
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
	fullWidth,
	iconPosition = 'left',
	...props
}: OtherProps) {
	return (
		<button
			type={type}
			className={`button ${fullWidth ? 'w-full' : ''}`}
			onClick={onClick ? onClick : () => {}}
			{...props}
		>
			{iconPosition === 'left' && icon}
			<span>{label}</span>
			{iconPosition === 'right' && icon}
		</button>
	)
}
