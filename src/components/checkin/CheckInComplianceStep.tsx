import React from 'react'
import Button from '../common/Button'
import Card from '../common/Card'

interface CheckInComplianceStepProps {
    dietCompliance: number
    setDietCompliance: (val: number) => void
    trainingCompliance: number
    setTrainingCompliance: (val: number) => void
    onBack: () => void
    onNext: () => void
}

export default function CheckInComplianceStep({
    dietCompliance,
    setDietCompliance,
    trainingCompliance,
    setTrainingCompliance,
    onBack,
    onNext,
}: CheckInComplianceStepProps) {
    const getColor = (val: number) => {
        if (val <= 2) return '#ef4444' // red
        if (val === 3) return '#f59e0b' // yellow
        return '#10b981' // green
    }

    const getLabel = (val: number) => {
        if (val === 1) return 'Poor (< 60%)'
        if (val === 2) return 'Partial (60-75%)'
        if (val === 3) return 'Moderate (75-85%)'
        if (val === 4) return 'High (85-95%)'
        return 'Flawless (100% on scale)'
    }

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🎯</div>
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px 0' }}>
                    Honest Compliance Sliders
                </h2>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Sliders default to 3. Be 100% transparent—the metabolic engine adjusts based on your actual inputs.
                </p>
            </div>

            {/* Diet Compliance */}
            <Card style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-main)' }}>
                        Diet Adherence
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: getColor(dietCompliance) }}>
                        {dietCompliance} / 5 — {getLabel(dietCompliance)}
                    </span>
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
                    Did you hit your macros and track raw/dry weights on the digital kitchen scale?
                </p>
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={dietCompliance}
                    onChange={(e) => setDietCompliance(parseInt(e.target.value, 10))}
                    style={{
                        width: '100%',
                        accentColor: getColor(dietCompliance),
                        cursor: 'pointer',
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>
                    <span>1 (Missed often)</span>
                    <span>3 (Baseline)</span>
                    <span>5 (100% Raw Grams)</span>
                </div>
            </Card>

            {/* Training Compliance */}
            <Card style={{ marginBottom: 25 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-main)' }}>
                        Training Adherence
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: getColor(trainingCompliance) }}>
                        {trainingCompliance} / 5 — {getLabel(trainingCompliance)}
                    </span>
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
                    Did you complete all programmed conditioning, lifting, and mobility sessions?
                </p>
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={trainingCompliance}
                    onChange={(e) => setTrainingCompliance(parseInt(e.target.value, 10))}
                    style={{
                        width: '100%',
                        accentColor: getColor(trainingCompliance),
                        cursor: 'pointer',
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>
                    <span>1 (Skipped)</span>
                    <span>3 (Completed some)</span>
                    <span>5 (All Finished)</span>
                </div>
            </Card>

            <div className="grid-2">
                <Button variant="secondary" onClick={onBack}>
                    ← Back
                </Button>
                <Button onClick={onNext}>
                    Next: Biofeedback →
                </Button>
            </div>
        </div>
    )
}
