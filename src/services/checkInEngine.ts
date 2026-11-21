import type { CheckInRecord } from '../types'

export interface CheckInInput {
    weightKg: number
    waistCm: number
    prevWeightKg?: number
    prevWaistCm?: number
    dietCompliance: number // 1-5
    trainingCompliance: number // 1-5
    hunger: 'Manageable' | 'Distracting' | 'Starving'
    energy: 'Explosive' | 'Normal' | 'Drained'
    sleep: 'Deep' | 'Interrupted' | 'Poor'
    weeksInDeficit?: number
    currentCalories: number
    currentProtein: number
    currentCarbs: number
    currentFat: number
    tdee: number
}

export interface CheckInEvaluationResult {
    verdict: 'green' | 'blue' | 'orange'
    verdictTitle: string
    verdictMessage: string
    biofeedbackWarning: boolean
    refeedRecommended: boolean
    refeedTargets?: {
        calories: number
        protein: number
        carbs: number
        fat: number
        extraCarbsG: number
    }
    adjustedCalories?: number
}

// 1. Refeed Math: Temporary return to 100% maintenance TDEE via Carbs
export function calculateRefeedTargets(
    weightKg: number,
    tdee: number,
    currentProtein: number,
    currentCarbs: number
) {
    const refeedCalories = Math.round(tdee)
    const protein = currentProtein // Unchanged to preserve lean mass
    const fat = Math.round(weightKg * 0.8) // Cap fat to prioritize carb uptake (15-20% total energy)
    const remainingCalories = refeedCalories - (protein * 4 + fat * 9)
    const carbs = Math.max(currentCarbs, Math.round(remainingCalories / 4))
    const extraCarbsG = Math.max(0, carbs - currentCarbs)

    return {
        calories: refeedCalories,
        protein,
        carbs,
        fat,
        extraCarbsG,
    }
}

// 2. The Algorithmic Verdict Engine
export function evaluateCheckIn(input: CheckInInput): CheckInEvaluationResult {
    const {
        weightKg,
        waistCm,
        prevWeightKg = weightKg + 0.6,
        prevWaistCm = waistCm + 1.0,
        dietCompliance,
        trainingCompliance,
        hunger,
        energy,
        weeksInDeficit = 4,
        currentCalories,
        currentProtein,
        currentCarbs,
        tdee,
    } = input

    const biofeedbackWarning = hunger === 'Starving' && energy === 'Drained'
    const highCompliance = dietCompliance >= 4 && trainingCompliance >= 4

    const weightDelta = weightKg - prevWeightKg
    const waistDelta = waistCm - prevWaistCm

    // Progress criteria: Waist down by >= 0.5cm OR weight down by >= 0.4kg
    const isProgressing = waistDelta <= -0.5 || weightDelta <= -0.4

    // 1. GREEN: Active Fat Loss
    if (isProgressing && !biofeedbackWarning) {
        const deltaText = waistDelta <= -0.5
            ? `Waist is down ${Math.abs(waistDelta).toFixed(1)}cm`
            : `Fasted weight is down ${Math.abs(weightDelta).toFixed(1)}kg`

        return {
            verdict: 'green',
            verdictTitle: 'Fat Loss is Active',
            verdictMessage: `${deltaText}. Metabolism is responding optimally. Protocol locked for another 7 days.`,
            biofeedbackWarning: false,
            refeedRecommended: false,
        }
    }

    // 2. BLUE: Metabolic Adaptation Detected -> 48-Hour High-Carb Refeed
    // Triggers: High compliance stall, OR 6+ weeks in deficit, OR biofeedback warning
    const adaptationTriggered =
        weeksInDeficit >= 6 ||
        biofeedbackWarning ||
        (highCompliance && (waistDelta > -0.3 && weightDelta > -0.2))

    if (adaptationTriggered) {
        const refeedTargets = calculateRefeedTargets(
            weightKg,
            tdee > currentCalories ? tdee : currentCalories + 450,
            currentProtein,
            currentCarbs
        )

        let reason = 'Metabolic adaptation detected.'
        if (biofeedbackWarning) {
            reason = 'Severe hunger and energy drain detected.'
        } else if (weeksInDeficit >= 6) {
            reason = '6+ weeks in continuous deficit reached.'
        } else {
            reason = 'Scale & waist stalled despite high adherence.'
        }

        return {
            verdict: 'blue',
            verdictTitle: 'Initiating 48-Hour High-Carb Refeed',
            verdictMessage: `${reason} We are implementing a temporary return to maintenance to spike leptin, replenish glycogen, and drop cortisol. Enjoy the extra rice and potatoes—hit these new targets exactly.`,
            biofeedbackWarning,
            refeedRecommended: true,
            refeedTargets,
        }
    }

    // 3. ORANGE: True Plateau -> 5% Calorie Drop
    const adjustedCalories = Math.round(currentCalories * 0.95)
    return {
        verdict: 'orange',
        verdictTitle: '5% Caloric Adjustment',
        verdictMessage: `Stall detected with moderate adherence. Daily energy intake adjusted from ${currentCalories} to ${adjustedCalories} Kcal to break this plateau.`,
        biofeedbackWarning,
        refeedRecommended: false,
        adjustedCalories,
    }
}
