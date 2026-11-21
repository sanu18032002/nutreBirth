import React, { useState } from 'react'
import ViewHeader from '../../components/common/ViewHeader'
import Button from '../../components/common/Button'
import SelectCard from '../../components/common/SelectCard'
import { StyledInput, StyledSelect } from '../../components/common/StyledInput'
import type { IntakeDiagnostics } from '../../types'

interface IntakeQuestionnaireProps {
    initialData?: IntakeDiagnostics
    onSubmit: (data: IntakeDiagnostics) => void
}

export default function IntakeQuestionnaire({ initialData, onSubmit }: IntakeQuestionnaireProps) {
    const [age, setAge] = useState<number>(initialData?.age ?? 28)
    const [sex, setSex] = useState<'Male' | 'Female'>(initialData?.sex ?? 'Male')
    const [weightKg, setWeightKg] = useState<number>(initialData?.weightKg ?? 75)
    const [heightCm, setHeightCm] = useState<number>(initialData?.heightCm ?? 175)

    const [activityLevel, setActivityLevel] = useState<string>(
        initialData?.activityLevel ?? 'Moderately Active (Workout 3-4x/wk)'
    )
    const [dietaryPreference, setDietaryPreference] = useState<string>(
        initialData?.dietaryPreference ?? 'omnivore'
    )

    const [avgSleep, setAvgSleep] = useState<string>(initialData?.avgSleep ?? '7-9 Hours (Optimal)')
    const [stressMood, setStressMood] = useState<string>(initialData?.stressMood ?? 'Low / Manageable')

    const [jointLimitations, setJointLimitations] = useState<string[]>(
        initialData?.jointLimitations ?? ['None / Healthy']
    )
    const [wearables, setWearables] = useState<string[]>(initialData?.wearables ?? [])

    const toggleJoint = (item: string) => {
        if (item === 'None / Healthy') {
            setJointLimitations(['None / Healthy'])
            return
        }
        const filtered = jointLimitations.filter((j) => j !== 'None / Healthy')
        if (filtered.includes(item)) {
            const next = filtered.filter((j) => j !== item)
            setJointLimitations(next.length ? next : ['None / Healthy'])
        } else {
            setJointLimitations([...filtered, item])
        }
    }

    const toggleWearable = (item: string) => {
        setWearables((prev) =>
            prev.includes(item) ? prev.filter((w) => w !== item) : [...prev, item]
        )
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({
            age,
            sex,
            weightKg,
            heightCm,
            activityLevel,
            dietaryPreference,
            avgSleep,
            stressMood,
            jointLimitations,
            wearables,
        })
    }

    return (
        <div className="view-container no-nav">
            <ViewHeader title="Intake Diagnostics" />
            <div className="content">
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 25 }}>
                    To calibrate the NutReBirth engines perfectly, we need your comprehensive baseline metrics.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="section-title" style={{ marginTop: 0 }}>
                        Core Biometrics
                    </div>
                    <div className="grid-2">
                        <StyledInput
                            label="Age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            placeholder="e.g. 28"
                            required
                        />
                        <StyledSelect
                            label="Biological Sex"
                            value={sex}
                            onChange={(e) => setSex(e.target.value as 'Male' | 'Female')}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </StyledSelect>
                    </div>

                    <div className="grid-2">
                        <StyledInput
                            label="Weight (kg)"
                            type="number"
                            value={weightKg}
                            onChange={(e) => setWeightKg(Number(e.target.value))}
                            placeholder="e.g. 75"
                            required
                        />
                        <StyledInput
                            label="Height (cm)"
                            type="number"
                            value={heightCm}
                            onChange={(e) => setHeightCm(Number(e.target.value))}
                            placeholder="e.g. 175"
                            required
                        />
                    </div>

                    <div className="section-title">Lifestyle & Metabolism</div>
                    <StyledSelect
                        label="Daily Activity Level"
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                    >
                        <option>Sedentary (Desk Job)</option>
                        <option>Lightly Active (Some walking)</option>
                        <option>Moderately Active (Workout 3-4x/wk)</option>
                        <option>Highly Active (Athlete / Physical Job)</option>
                    </StyledSelect>

                    <StyledSelect
                        label="Dietary Preference"
                        value={dietaryPreference}
                        onChange={(e) => setDietaryPreference(e.target.value)}
                    >
                        <option value="omnivore">Omnivore / Standard</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="keto">Keto</option>
                    </StyledSelect>

                    <div className="section-title">Sleep & Psychological State</div>
                    <div className="grid-2">
                        <StyledSelect
                            label="Avg. Sleep"
                            value={avgSleep}
                            onChange={(e) => setAvgSleep(e.target.value)}
                        >
                            <option>7-9 Hours (Optimal)</option>
                            <option>5-7 Hours</option>
                            <option>&lt; 5 Hours (Deprived)</option>
                        </StyledSelect>
                        <StyledSelect
                            label="Stress / Mood"
                            value={stressMood}
                            onChange={(e) => setStressMood(e.target.value)}
                        >
                            <option>Low / Manageable</option>
                            <option>High / Anxious</option>
                            <option>Fatigue / Depressive</option>
                        </StyledSelect>
                    </div>

                    <div className="section-title">Physical Readiness</div>
                    <div className="input-group">
                        <span className="input-label">Joint Pain / Limitations</span>
                        <div className="grid-2">
                            {['None / Healthy', 'Lower Back', 'Knees / Hips', 'Shoulders'].map((limitation) => (
                                <SelectCard
                                    key={limitation}
                                    active={jointLimitations.includes(limitation)}
                                    onClick={() => toggleJoint(limitation)}
                                >
                                    {limitation}
                                </SelectCard>
                            ))}
                        </div>
                    </div>

                    <div className="section-title">Data Integration</div>
                    <div className="input-group">
                        <span className="input-label">Connect Wearable</span>
                        <div className="grid-2">
                            <SelectCard
                                active={wearables.includes('Apple Watch')}
                                onClick={() => toggleWearable('Apple Watch')}
                            >
                                ⌚ Apple Watch
                            </SelectCard>
                            <SelectCard
                                active={wearables.includes('Fitbit / Garmin')}
                                onClick={() => toggleWearable('Fitbit / Garmin')}
                            >
                                🟢 Fitbit / Garmin
                            </SelectCard>
                        </div>
                    </div>

                    <Button type="submit" style={{ marginTop: 20 }}>
                        Analyze Profile →
                    </Button>
                </form>
            </div>
        </div>
    )
}
