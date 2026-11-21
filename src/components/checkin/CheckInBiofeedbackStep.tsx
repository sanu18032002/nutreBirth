import React from 'react'
import Button from '../common/Button'
import SelectCard from '../common/SelectCard'

interface CheckInBiofeedbackStepProps {
    hunger: 'Manageable' | 'Distracting' | 'Starving'
    setHunger: (val: 'Manageable' | 'Distracting' | 'Starving') => void
    energy: 'Explosive' | 'Normal' | 'Drained'
    setEnergy: (val: 'Explosive' | 'Normal' | 'Drained') => void
    sleep: 'Deep' | 'Interrupted' | 'Poor'
    setSleep: (val: 'Deep' | 'Interrupted' | 'Poor') => void
    onBack: () => void
    onNext: () => void
}

export default function CheckInBiofeedbackStep({
    hunger,
    setHunger,
    energy,
    setEnergy,
    sleep,
    setSleep,
    onBack,
    onNext,
}: CheckInBiofeedbackStepProps) {
    const isWarning = hunger === 'Starving' && energy === 'Drained'

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🧠</div>
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px 0' }}>
                    Biofeedback &amp; Recovery
                </h2>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Tap to report your physiological signals. No writing required.
                </p>
            </div>

            {/* Hunger */}
            <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                    Hunger Levels
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                    {(['Manageable', 'Distracting', 'Starving'] as const).map((h) => (
                        <SelectCard
                            key={h}
                            active={hunger === h}
                            onClick={() => setHunger(h)}
                            style={{ padding: '12px 6px', fontSize: 12 }}
                        >
                            {h === 'Manageable' ? '😌 Manageable' : h === 'Distracting' ? '😬 Distracting' : '🚨 Starving'}
                        </SelectCard>
                    ))}
                </div>
            </div>

            {/* Energy */}
            <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                    Training Energy &amp; Drive
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                    {(['Explosive', 'Normal', 'Drained'] as const).map((e) => (
                        <SelectCard
                            key={e}
                            active={energy === e}
                            onClick={() => setEnergy(e)}
                            style={{ padding: '12px 6px', fontSize: 12 }}
                        >
                            {e === 'Explosive' ? '⚡ Explosive' : e === 'Normal' ? '🔋 Normal' : '🪫 Drained'}
                        </SelectCard>
                    ))}
                </div>
            </div>

            {/* Sleep */}
            <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                    Sleep Quality
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                    {(['Deep', 'Interrupted', 'Poor'] as const).map((s) => (
                        <SelectCard
                            key={s}
                            active={sleep === s}
                            onClick={() => setSleep(s)}
                            style={{ padding: '12px 6px', fontSize: 12 }}
                        >
                            {s === 'Deep' ? '🌙 Deep' : s === 'Interrupted' ? '🥱 Interrupted' : '⚡ Poor'}
                        </SelectCard>
                    ))}
                </div>
            </div>

            {isWarning && (
                <div
                    style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '1px solid var(--accent-cyan)',
                        borderRadius: 12,
                        padding: '10px 14px',
                        fontSize: 11,
                        color: 'var(--accent-cyan)',
                        marginBottom: 20,
                    }}
                >
                    ℹ️ <strong>Metabolic Flag Active:</strong> You marked &ldquo;Starving&rdquo; and &ldquo;Drained&rdquo;. The system will prioritize evaluating a leptin refeed.
                </div>
            )}

            <div className="grid-2">
                <Button variant="secondary" onClick={onBack}>
                    ← Back
                </Button>
                <Button onClick={onNext}>
                    Next: Photos →
                </Button>
            </div>
        </div>
    )
}
