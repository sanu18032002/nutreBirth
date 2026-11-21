import React from 'react'
import Button from '../common/Button'
import { StyledInput } from '../common/StyledInput'

interface CheckInMetricsStepProps {
    weightKg: number
    setWeightKg: (val: number) => void
    waistCm: number
    setWaistCm: (val: number) => void
    prevWeightKg: number
    prevWaistCm: number
    onNext: () => void
}

export default function CheckInMetricsStep({
    weightKg,
    setWeightKg,
    waistCm,
    setWaistCm,
    prevWeightKg,
    prevWaistCm,
    onNext,
}: CheckInMetricsStepProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (weightKg > 0 && waistCm > 0) {
            onNext()
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>⚖️</div>
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px 0' }}>
                    Fasted Hard Metrics
                </h2>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Record your morning weight and navel waist measurement after waking and using the restroom.
                </p>
            </div>

            <div style={{ marginBottom: 18 }}>
                <StyledInput
                    label="Fasted Morning Weight (kg)"
                    type="number"
                    step="0.1"
                    value={weightKg || ''}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                    placeholder={`Last week: ${prevWeightKg.toFixed(1)} kg`}
                    required
                />
                <div style={{ fontSize: 11, color: 'var(--accent-cyan)', marginTop: -10, marginBottom: 12 }}>
                    Ghost context: Last check-in was <strong>{prevWeightKg.toFixed(1)} kg</strong>
                </div>
            </div>

            <div style={{ marginBottom: 25 }}>
                <StyledInput
                    label="Navel Waist (cm)"
                    type="number"
                    step="0.5"
                    value={waistCm || ''}
                    onChange={(e) => setWaistCm(parseFloat(e.target.value) || 0)}
                    placeholder={`Last week: ${prevWaistCm.toFixed(1)} cm`}
                    required
                />
                <div style={{ fontSize: 11, color: 'var(--accent-cyan)', marginTop: -10, marginBottom: 12 }}>
                    Ghost context: Last check-in was <strong>{prevWaistCm.toFixed(1)} cm</strong>
                </div>
            </div>

            <Button type="submit">
                Continue to Compliance →
            </Button>
        </form>
    )
}
