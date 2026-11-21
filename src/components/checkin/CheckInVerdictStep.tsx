import React, { useEffect, useState } from 'react'
import Button from '../common/Button'
import Card from '../common/Card'
import type { CheckInEvaluationResult } from '../../services/checkInEngine'

interface CheckInVerdictStepProps {
    result: CheckInEvaluationResult
    onFinish: () => void
}

export default function CheckInVerdictStep({ result, onFinish }: CheckInVerdictStepProps) {
    const [isScanning, setIsScanning] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsScanning(false)
        }, 2200)
        return () => clearTimeout(timer)
    }, [])

    if (isScanning) {
        return (
            <div style={{ textAlign: 'center', padding: '50px 10px' }}>
                <div
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        border: '3px solid rgba(0, 212, 255, 0.2)',
                        borderTopColor: 'var(--accent-cyan)',
                        animation: 'spin 0.9s linear infinite',
                        margin: '0 auto 24px auto',
                    }}
                />
                <style>{`
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 8px 0', color: 'var(--accent-cyan)' }}>
                    Analyzing Metabolic Trends...
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Evaluating weight velocity, waist delta, adherence, and leptin adaptation triggers.
                </p>
            </div>
        )
    }

    const isGreen = result.verdict === 'green'
    const isBlue = result.verdict === 'blue'

    const accentColor = isGreen
        ? 'var(--accent-green)'
        : isBlue
        ? 'var(--accent-cyan)'
        : 'var(--accent-yellow)'

    const badgeBg = isGreen
        ? 'rgba(0, 255, 136, 0.15)'
        : isBlue
        ? 'rgba(0, 212, 255, 0.15)'
        : 'rgba(255, 193, 7, 0.15)'

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <span
                    style={{
                        background: badgeBg,
                        color: accentColor,
                        border: `1px solid ${accentColor}`,
                        fontSize: 10,
                        fontWeight: 900,
                        padding: '4px 12px',
                        borderRadius: 20,
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                        display: 'inline-block',
                        marginBottom: 12,
                    }}
                >
                    {isGreen
                        ? '✓ Active Fat Loss Confirmed'
                        : isBlue
                        ? '⚡ 48-Hour Refeed Triggered'
                        : '⚠️ 5% Caloric Adjustment'}
                </span>

                <h2 style={{ fontSize: 19, fontWeight: 900, margin: '0 0 8px 0' }}>
                    {result.verdictTitle}
                </h2>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {result.verdictMessage}
                </p>
            </div>

            {/* Refeed Specific Action Card */}
            {isBlue && result.refeedTargets && (
                <Card
                    gradient
                    style={{
                        borderColor: 'var(--accent-cyan)',
                        marginBottom: 20,
                        padding: 16,
                    }}
                >
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: 6 }}>
                        Weekend Refeed Targets (48 Hours)
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 8 }}>
                        {result.refeedTargets.calories}{' '}
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Kcal (Maintenance)</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center', marginBottom: 12 }}>
                        <div style={{ background: '#161b22', padding: 8, borderRadius: 8 }}>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Protein</div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-green)' }}>
                                {result.refeedTargets.protein}g
                            </div>
                        </div>
                        <div style={{ background: '#161b22', padding: 8, borderRadius: 8, border: '1px solid var(--accent-cyan)' }}>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Carbs</div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-cyan)' }}>
                                {result.refeedTargets.carbs}g (+{result.refeedTargets.extraCarbsG}g)
                            </div>
                        </div>
                        <div style={{ background: '#161b22', padding: 8, borderRadius: 8 }}>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Fats (Capped)</div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-yellow)' }}>
                                {result.refeedTargets.fat}g
                            </div>
                        </div>
                    </div>

                    <p style={{ fontSize: 11, color: '#e5e7eb', lineHeight: 1.4, margin: 0 }}>
                        💡 <strong>Plate Instruction:</strong> Extra energy is channeled entirely through carbohydrates (rice, sweet potatoes, oats). Your Hub plate will display increased raw portions.
                    </p>
                </Card>
            )}

            {isGreen && (
                <Card style={{ borderColor: 'var(--accent-green)', background: 'rgba(0, 255, 136, 0.04)', marginBottom: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-green)', marginBottom: 4 }}>
                        🎯 Operational Directive
                    </div>
                    <p style={{ fontSize: 12, color: '#e5e7eb', lineHeight: 1.5, margin: 0 }}>
                        Your rate of fat loss is right in the optimal zone (0.5–1.0% body weight/week). No adjustments needed. Keep tracking raw gram scale weights for the next 7 days.
                    </p>
                </Card>
            )}

            <Button onClick={onFinish}>
                Apply &amp; Return to Hub →
            </Button>
        </div>
    )
}
