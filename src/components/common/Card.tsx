import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    gradient?: boolean
    borderColor?: string
    className?: string
}

export default function Card({
    children,
    gradient = false,
    borderColor,
    className = '',
    style,
    ...props
}: CardProps) {
    const cardStyle: React.CSSProperties = {
        ...(gradient ? { background: 'linear-gradient(135deg, #111827, #0a1128)' } : {}),
        ...(borderColor ? { borderColor } : {}),
        ...style,
    }

    return (
        <div className={`card ${className}`} style={cardStyle} {...props}>
            {children}
        </div>
    )
}
