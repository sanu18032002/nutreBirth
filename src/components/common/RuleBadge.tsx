import React from 'react'

interface RuleBadgeProps {
    type: string
    color: string
}

export default function RuleBadge({ type, color }: RuleBadgeProps) {
    return (
        <span
            style={{
                fontSize: 9,
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: 4,
                border: `1px solid ${color}`,
                color: color,
                height: 'fit-content',
                textTransform: 'uppercase',
                display: 'inline-block',
                flexShrink: 0,
            }}
        >
            {type}
        </span>
    )
}
