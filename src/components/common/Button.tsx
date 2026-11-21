import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
    children: React.ReactNode
    className?: string
}

export default function Button({
    variant = 'primary',
    children,
    className = '',
    ...props
}: ButtonProps) {
    const variantClass = variant === 'secondary' ? 'btn-primary btn-secondary' : 'btn-primary'
    return (
        <button className={`${variantClass} ${className}`} {...props}>
            {children}
        </button>
    )
}
