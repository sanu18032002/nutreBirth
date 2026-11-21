import React from 'react'

interface SelectCardProps {
    children: React.ReactNode
    active?: boolean
    onClick?: () => void
    className?: string
    style?: React.CSSProperties
}

export default function SelectCard({
    children,
    active = false,
    onClick,
    className = '',
    style,
}: SelectCardProps) {
    return (
        <div
            className={`select-card ${active ? 'active' : ''} ${className}`}
            onClick={onClick}
            style={style}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onClick?.()
                }
            }}
        >
            {children}
        </div>
    )
}
