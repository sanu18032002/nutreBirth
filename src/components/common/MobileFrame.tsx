import React from 'react'

interface MobileFrameProps {
    children: React.ReactNode
    className?: string
}

export default function MobileFrame({ children, className = '' }: MobileFrameProps) {
    return (
        <div className={`mobile-frame ${className}`}>
            {children}
        </div>
    )
}
