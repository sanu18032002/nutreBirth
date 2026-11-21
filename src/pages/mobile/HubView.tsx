import React from 'react'
import Card from '../../components/common/Card'
import RuleBadge from '../../components/common/RuleBadge'
import { getProtocolData } from '../../services/protocolEngine'
import type { TrackId, IntakeDiagnostics } from '../../types'

interface HubViewProps {
    trackId: TrackId
    intake?: IntakeDiagnostics
    onRetakeTriage?: () => void
}

export default function HubView({ trackId, intake, onRetakeTriage }: HubViewProps) {
    const protocol = getProtocolData(trackId)

    return (
        <div className="view-container">
            <header className="header">
                <div>
                    <h1 style={{ fontSize: 20 }}>NutReBirth Hub</h1>
                    <span
                        style={{
                            fontSize: 10,
                            color: 'var(--accent-cyan)',
                            textTransform: 'uppercase',
                            fontWeight: 800,
                            letterSpacing: '0.5px',
                        }}
                    >
                        {protocol.title}
                    </span>
                </div>
                {onRetakeTriage && (
                    <button
                        type="button"
                        onClick={onRetakeTriage}
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-muted)',
                            padding: '6px 10px',
                            borderRadius: 8,
                            fontSize: 10,
                            cursor: 'pointer',
                            fontWeight: 700,
                        }}
                    >
                        ⚙ Protocol
                    </button>
                )}
            </header>

            <div className="content">
                <div className="db-badge">
                    Integrations: Master_Nutrition.xlsx & Exercise_DB.xlsx
                </div>

                {/* Daily Targets Summary Card */}
                <Card gradient borderColor="var(--accent-cyan)" style={{ marginBottom: 20 }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            marginBottom: 8,
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontSize: 10,
                                    color: 'var(--text-muted)',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.8px',
                                }}
                            >
                                Daily Targets
                            </div>
                            <div
                                style={{
                                    fontSize: 28,
                                    fontWeight: 900,
                                    color: 'var(--accent-cyan)',
                                    lineHeight: 1.1,
                                    marginTop: 4,
                                }}
                            >
                                {protocol.dailyTargets.calories.toLocaleString()}{' '}
                                <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600 }}>
                                    Kcal
                                </span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-green)' }}>
                                P: {protocol.dailyTargets.protein}g
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-cyan)' }}>
                                C: {protocol.dailyTargets.carbs}g
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-yellow)' }}>
                                F: {protocol.dailyTargets.fat}g
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Today's Nutrition Plan */}
                <div className="section-title">Today's Nutrition Plan</div>
                <div style={{ marginBottom: 20 }}>
                    {protocol.mealPlans.map((m, idx) => (
                        <div
                            key={idx}
                            className="card"
                            style={{
                                padding: '14px',
                                marginBottom: 10,
                                borderLeft: '3px solid var(--accent-cyan)',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 10,
                                    color: 'var(--accent-cyan)',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                }}
                            >
                                {m.meal}
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 700, margin: '5px 0' }}>
                                {m.food}
                            </div>
                            <div
                                style={{
                                    fontSize: 11,
                                    color: 'var(--accent-green)',
                                    fontWeight: 700,
                                    marginBottom: 6,
                                }}
                            >
                                ⚖️ {m.qty}
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                                {m.macros}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Today's Workout Plan */}
                <div className="section-title">Today's Workout Plan</div>
                <div style={{ marginBottom: 20 }}>
                    {protocol.workoutPlans.map((w, idx) => (
                        <div
                            key={idx}
                            className="card"
                            style={{
                                padding: '14px',
                                marginBottom: 10,
                                borderLeft: '3px solid var(--accent-green)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: 8,
                                }}
                            >
                                <div style={{ fontSize: 14, fontWeight: 700 }}>{w.name}</div>
                                <div
                                    style={{
                                        fontSize: 10,
                                        background: 'rgba(0, 255, 136, 0.1)',
                                        color: 'var(--accent-green)',
                                        padding: '3px 8px',
                                        borderRadius: 6,
                                        fontWeight: 800,
                                        flexShrink: 0,
                                    }}
                                >
                                    {w.sets}
                                </div>
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.4 }}>
                                {w.notes}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Applied AI Rules (The "Why") */}
                <div className="section-title">Applied AI Rules (The &quot;Why&quot;)</div>
                <Card style={{ fontSize: 12, lineHeight: 1.5, marginBottom: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: 10, textTransform: 'uppercase' }}>
                        Nutrition Directives
                    </div>
                    {protocol.nutritionRules.map((rule, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: 'flex',
                                gap: 10,
                                alignItems: 'flex-start',
                                marginBottom: idx === protocol.nutritionRules.length - 1 ? 0 : 10,
                                paddingBottom: idx === protocol.nutritionRules.length - 1 ? 0 : 10,
                                borderBottom: idx === protocol.nutritionRules.length - 1 ? 'none' : '1px solid #1f2937',
                            }}
                        >
                            <RuleBadge type={rule.type} color={rule.color} />
                            <span style={{ color: '#e5e7eb' }}>{rule.text}</span>
                        </div>
                    ))}
                </Card>

                <Card style={{ fontSize: 12, lineHeight: 1.5 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-green)', marginBottom: 10, textTransform: 'uppercase' }}>
                        Biomechanics &amp; Exercise Vetoes
                    </div>
                    {protocol.exerciseRules.map((rule, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: 'flex',
                                gap: 10,
                                alignItems: 'flex-start',
                                marginBottom: idx === protocol.exerciseRules.length - 1 ? 0 : 10,
                                paddingBottom: idx === protocol.exerciseRules.length - 1 ? 0 : 10,
                                borderBottom: idx === protocol.exerciseRules.length - 1 ? 'none' : '1px solid #1f2937',
                            }}
                        >
                            <RuleBadge type={rule.type} color={rule.color} />
                            <span style={{ color: '#e5e7eb' }}>{rule.text}</span>
                        </div>
                    ))}
                </Card>
            </div>
        </div>
    )
}
