'use client'
import { ReactElement, ReactNode } from 'react'

interface ButtonProps {
	style?: 'primay' | 'secondary'
	onClick?: (...args: any[]) => void
	label?: string
	ariaLabel: string
	icon: ReactElement
	iconPosition?: 'left' | 'right'
}

export default function Button({
	style,
	onClick,
	label,
	ariaLabel,
	icon,
	iconPosition = 'left',
}: ButtonProps) {
	return (
		<button
			className="flex justify-center items-center space-x-2 p-1.5 rounded-md transition-colors duration-200 hover:bg-red-500 hover:bg-opacity-80 hover:text-white"
			aria-label={ariaLabel}
			onClick={onClick ? onClick : () => {}}
		>
			{iconPosition === 'left' && icon}
			{label && <span>{label}</span>}
			{iconPosition === 'right' && icon}
		</button>
	)
}
