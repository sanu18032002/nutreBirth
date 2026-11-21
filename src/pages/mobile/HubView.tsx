import { useState } from 'react'
import Card from '../../components/common/Card'
import RuleBadge from '../../components/common/RuleBadge'
import { getProtocolData } from '../../services/protocolEngine'
import type { TrackId, IntakeDiagnostics, CheckInRecord } from '../../types'

interface HubViewProps {
    trackId: TrackId
    intake?: IntakeDiagnostics
    onRetakeTriage?: () => void
    onOpenCheckIn?: () => void
    refeedActive?: boolean
    refeedTargets?: {
        calories: number
        protein: number
        carbs: number
        fat: number
        extraCarbsG: number
    }
    latestCheckIn?: CheckInRecord
}

export default function HubView({
    trackId,
    intake,
    onRetakeTriage,
    onOpenCheckIn,
    refeedActive = false,
    refeedTargets,
    latestCheckIn,
}: HubViewProps) {
    const protocol = getProtocolData(trackId)
    const [isRefeedDay, setIsRefeedDay] = useState(refeedActive)

    const activeDailyTargets = (isRefeedDay && refeedTargets)
        ? refeedTargets
        : protocol.dailyTargets

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
                {/* 1. Weekly Check-In Trigger Card */}
                {onOpenCheckIn && (
                    <div
                        style={{
                            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(0, 255, 136, 0.08))',
                            border: '1px solid rgba(0, 212, 255, 0.35)',
                            borderRadius: 14,
                            padding: '12px 14px',
                            marginBottom: 16,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                                🔔 Weekly Check-In Protocol
                            </div>
                            <div style={{ fontSize: 12, color: '#e5e7eb', marginTop: 2, fontWeight: 600 }}>
                                {latestCheckIn
                                    ? `Last Log: ${latestCheckIn.weightKg}kg • ${latestCheckIn.waistCm}cm (${latestCheckIn.verdictTitle})`
                                    : 'Log fasted weight & navel waist metrics'}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onOpenCheckIn}
                            className="btn-primary"
                            style={{
                                width: 'auto',
                                padding: '8px 14px',
                                fontSize: 11,
                                margin: 0,
                                flexShrink: 0,
                            }}
                        >
                            {latestCheckIn ? 'Re-Check' : 'Start →'}
                        </button>
                    </div>
                )}

                {/* 2. Refeed State Banner & Toggle */}
                {refeedActive && refeedTargets && (
                    <div
                        style={{
                            background: isRefeedDay
                                ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(41, 98, 255, 0.2))'
                                : '#161b22',
                            border: `1px solid ${isRefeedDay ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
                            borderRadius: 14,
                            padding: '12px 14px',
                            marginBottom: 16,
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
                                ⚡ 48-Hour High-Carb Refeed Mode
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsRefeedDay(!isRefeedDay)}
                                style={{
                                    background: isRefeedDay ? 'var(--accent-cyan)' : '#222',
                                    color: isRefeedDay ? '#000' : 'var(--text-muted)',
                                    border: 'none',
                                    padding: '4px 10px',
                                    borderRadius: 12,
                                    fontSize: 10,
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                }}
                            >
                                {isRefeedDay ? 'ACTIVE (Refeed)' : 'Toggle ON'}
                            </button>
                        </div>
                        <p style={{ fontSize: 11, color: '#e5e7eb', margin: 0, lineHeight: 1.4 }}>
                            {isRefeedDay
                                ? `+${refeedTargets.extraCarbsG}g Carbs active to reset leptin and lower cortisol. Enjoy the extra rice and potatoes.`
                                : 'Deficit day mode. Tap "Toggle ON" to switch your plate to weekend refeed targets.'}
                        </p>
                    </div>
                )}

                <div className="db-badge">
                    Integrations: Master_Nutrition.xlsx &amp; Exercise_DB.xlsx
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
                                {isRefeedDay ? 'Refeed Day Targets (TDEE Maintenance)' : 'Daily Targets (Deficit Engine)'}
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
                                {activeDailyTargets.calories.toLocaleString()}{' '}
                                <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600 }}>
                                    Kcal
                                </span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-green)' }}>
                                P: {activeDailyTargets.protein}g
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-cyan)' }}>
                                C: {activeDailyTargets.carbs}g {isRefeedDay && refeedTargets ? `(+${refeedTargets.extraCarbsG}g)` : ''}
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-yellow)' }}>
                                F: {activeDailyTargets.fat}g
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Today's Nutrition Plan */}
                <div className="section-title">
                    {isRefeedDay ? "Today's Nutrition Plan (Refeed Gram Weights)" : "Today's Nutrition Plan"}
                </div>
                <div style={{ marginBottom: 20 }}>
                    {protocol.mealPlans.map((m, idx) => {
                        let displayedQty = m.qty
                        if (isRefeedDay && refeedTargets) {
                            if (m.qty.includes('Rice')) {
                                displayedQty = displayedQty.replace(/100g Rice/, '220g Rice (High-Carb Refeed)')
                            }
                            if (m.qty.includes('Sweet Potato')) {
                                displayedQty = displayedQty.replace(/200g Sweet Potato/, '300g Sweet Potato (Glycogen Spike)')
                            }
                            if (m.qty.includes('Quinoa')) {
                                displayedQty = displayedQty.replace(/50g Quinoa/, '110g Quinoa (Carb Load)')
                            }
                        }

                        return (
                            <div
                                key={idx}
                                className="card"
                                style={{
                                    padding: '14px',
                                    marginBottom: 10,
                                    borderLeft: `3px solid ${isRefeedDay ? 'var(--accent-cyan)' : 'var(--accent-cyan)'}`,
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
                                    ⚖️ {displayedQty}
                                </div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                                    {m.macros}
                                </div>
                            </div>
                        )
                    })}
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
