type Props = {
    label: string
    value: number
    target: number
    onClick?: () => void
}

export default function ProgressCard({
    label,
    value,
    target,
    onClick,
}: Props) {
    const pct =
        target > 0 ? Math.min(100, Math.round((value / target) * 100)) : 0

    return (
        <div
            className="card"
            onClick={onClick}
            style={{
                cursor: onClick ? 'pointer' : 'default',
            }}
        >
            <div className="text-muted">{label}</div>

            <div
                style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    marginTop: 8,
                }}
            >
                {value.toFixed(1)} / {target}
            </div>

            <div
                style={{
                    marginTop: 12,
                    height: 12,
                    background: '#e5e7eb',
                    borderRadius: 999,
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: 'linear-gradient(90deg, var(--protein), var(--brand))',
                        transition: 'width 0.3s ease',
                    }}
                />
            </div>
        </div>
    )
}
