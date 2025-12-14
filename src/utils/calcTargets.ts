export type Sex = 'male' | 'female' | 'other'
export type Activity = 'sedentary' | 'light' | 'moderate' | 'active'
export type Goal = 'maintain' | 'build' | 'lose'

export function calcBMR(weightKg:number, heightCm:number, age:number=30, sex:Sex='male') {
  if (sex === 'female') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161
  }
  return 10 * weightKg + 6.25 * heightCm - 5 * age + 5
}

export function calcTDEE(bmr:number, activity:Activity='moderate') {
  const map: Record<Activity, number> = { sedentary:1.2, light:1.375, moderate:1.55, active:1.725 }
  return Math.round(bmr * map[activity])
}

export function calcProteinTarget(weightKg:number, goal:Goal='build') {
  const map: Record<Goal, number> = { maintain:1.2, build:1.6, lose:1.4 }
  return Math.round(weightKg * (map[goal] ?? 1.6))
}
