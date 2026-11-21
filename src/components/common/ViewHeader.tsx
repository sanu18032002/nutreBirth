import React from 'react'

interface ViewHeaderProps {
    title: string
    subtitle?: string
    onBack?: () => void
    rightAction?: React.ReactNode
}

export default function ViewHeader({ title, subtitle, onBack, rightAction }: ViewHeaderProps) {
    return (
        <header className="header">
            <div className="header-left">
                {onBack && (
                    <button
                        type="button"
                        className="back-btn"
                        onClick={onBack}
                        aria-label="Go back"
                    >
                        ←
                    </button>
                )}
                <div>
                    <h1>{title}</h1>
                    {subtitle && (
                        <div style={{ fontSize: 10, color: 'var(--accent-cyan)', textTransform: 'uppercase', fontWeight: 800, marginTop: 2 }}>
                            {subtitle}
                        </div>
                    )}
                </div>
            </div>
            {rightAction && <div>{rightAction}</div>}
        </header>
    )
}
