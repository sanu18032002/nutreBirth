import { useState } from 'react'
import ViewHeader from '../common/ViewHeader'
import CheckInMetricsStep from './CheckInMetricsStep'
import CheckInComplianceStep from './CheckInComplianceStep'
import CheckInBiofeedbackStep from './CheckInBiofeedbackStep'
import CheckInPhotosStep from './CheckInPhotosStep'
import CheckInVerdictStep from './CheckInVerdictStep'
import { evaluateCheckIn, CheckInEvaluationResult } from '../../services/checkInEngine'
import type { CheckInRecord } from '../../types'

interface WeeklyCheckInModalProps {
    onClose: () => void
    onComplete: (record: CheckInRecord, result: CheckInEvaluationResult) => void
    prevWeightKg?: number
    prevWaistCm?: number
    currentCalories: number
    currentProtein: number
    currentCarbs: number
    currentFat: number
    tdee: number
    weeksInDeficit?: number
}

export default function WeeklyCheckInModal({
    onClose,
    onComplete,
    prevWeightKg = 76.5,
    prevWaistCm = 85.0,
    currentCalories,
    currentProtein,
    currentCarbs,
    currentFat,
    tdee,
    weeksInDeficit = 4,
}: WeeklyCheckInModalProps) {
    const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)

    // Form State
    const [weightKg, setWeightKg] = useState<number>(prevWeightKg - 0.5)
    const [waistCm, setWaistCm] = useState<number>(prevWaistCm - 0.5)
    const [dietCompliance, setDietCompliance] = useState<number>(3)
    const [trainingCompliance, setTrainingCompliance] = useState<number>(3)
    const [hunger, setHunger] = useState<'Manageable' | 'Distracting' | 'Starving'>('Manageable')
    const [energy, setEnergy] = useState<'Explosive' | 'Normal' | 'Drained'>('Normal')
    const [sleep, setSleep] = useState<'Deep' | 'Interrupted' | 'Poor'>('Deep')
    const [photosUploaded, setPhotosUploaded] = useState(false)

    // Result State
    const [evaluationResult, setEvaluationResult] = useState<CheckInEvaluationResult | null>(null)

    const handleProceedToVerdict = (hasPhotos: boolean) => {
        setPhotosUploaded(hasPhotos)

        const result = evaluateCheckIn({
            weightKg,
            waistCm,
            prevWeightKg,
            prevWaistCm,
            dietCompliance,
            trainingCompliance,
            hunger,
            energy,
            sleep,
            weeksInDeficit,
            currentCalories,
            currentProtein,
            currentCarbs,
            currentFat,
            tdee,
        })

        setEvaluationResult(result)
        setStep(5)
    }

    const handleFinish = () => {
        if (!evaluationResult) return

        const record: CheckInRecord = {
            id: Date.now().toString(),
            date: new Date().toISOString().slice(0, 10),
            weightKg,
            waistCm,
            dietCompliance,
            trainingCompliance,
            hunger,
            energy,
            sleep,
            biofeedbackWarning: evaluationResult.biofeedbackWarning,
            photosUploaded,
            verdict: evaluationResult.verdict,
            verdictTitle: evaluationResult.verdictTitle,
            verdictMessage: evaluationResult.verdictMessage,
            weeksInDeficit: weeksInDeficit + 1,
        }

        onComplete(record, evaluationResult)
    }

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'var(--bg-base)',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
            }}
        >
            <ViewHeader
                title={`Weekly Check-In (${step}/5)`}
                onBack={step > 1 && step < 5 ? () => setStep((s) => (s - 1) as any) : undefined}
                rightAction={
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            fontSize: 18,
                            cursor: 'pointer',
                            padding: 4,
                        }}
                    >
                        ✕
                    </button>
                }
            />

            <div className="content" style={{ paddingBottom: 40 }}>
                {step === 1 && (
                    <CheckInMetricsStep
                        weightKg={weightKg}
                        setWeightKg={setWeightKg}
                        waistCm={waistCm}
                        setWaistCm={setWaistCm}
                        prevWeightKg={prevWeightKg}
                        prevWaistCm={prevWaistCm}
                        onNext={() => setStep(2)}
                    />
                )}

                {step === 2 && (
                    <CheckInComplianceStep
                        dietCompliance={dietCompliance}
                        setDietCompliance={setDietCompliance}
                        trainingCompliance={trainingCompliance}
                        setTrainingCompliance={setTrainingCompliance}
                        onBack={() => setStep(1)}
                        onNext={() => setStep(3)}
                    />
                )}

                {step === 3 && (
                    <CheckInBiofeedbackStep
                        hunger={hunger}
                        setHunger={setHunger}
                        energy={energy}
                        setEnergy={setEnergy}
                        sleep={sleep}
                        setSleep={setSleep}
                        onBack={() => setStep(2)}
                        onNext={() => setStep(4)}
                    />
                )}

                {step === 4 && (
                    <CheckInPhotosStep
                        onBack={() => setStep(3)}
                        onNext={handleProceedToVerdict}
                    />
                )}

                {step === 5 && evaluationResult && (
                    <CheckInVerdictStep
                        result={evaluationResult}
                        onFinish={handleFinish}
                    />
                )}
            </div>
        </div>
    )
}
