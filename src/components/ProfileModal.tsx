import React, { useState, useEffect } from 'react'
import { db } from '../db'
import type { UserProfile } from '../types'

type Props = {
  onSaved?: (p: UserProfile) => void
  initialProfile?: UserProfile
}

export default function ProfileModal({ onSaved, initialProfile }: Props) {
  const [heightCm, setHeightCm] = useState<number>(initialProfile?.heightCm ?? 170)
  const [weightKg, setWeightKg] = useState<number>(initialProfile?.weightKg ?? 70)
  const [age, setAge] = useState<number>(initialProfile?.age ?? 30)
  const [sex, setSex] = useState<'male' | 'female' | 'other'>(initialProfile?.sex ?? 'male')
  const [activity, setActivity] = useState<'sedentary' | 'light' | 'moderate' | 'active'>(
    initialProfile?.activityLevel ?? 'moderate'
  )
  const [goal, setGoal] = useState<'maintain' | 'build' | 'lose'>(
    initialProfile?.proteinTargetG ? 'build' : 'build'
  )
  const [dietType, setDietType] = useState<'vegetarian' | 'non-vegetarian'>(
    initialProfile?.dietType ?? 'vegetarian'
  )
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (initialProfile) {
      setHeightCm(initialProfile.heightCm ?? heightCm)
      setWeightKg(initialProfile.weightKg ?? weightKg)
      setAge(initialProfile.age ?? age)
      setSex(initialProfile.sex ?? sex)
      setActivity(initialProfile.activityLevel ?? activity)
      setDietType(initialProfile.dietType ?? dietType)
    }
  }, [initialProfile])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const multiplier =
      goal === 'maintain' ? 1.2 : goal === 'lose' ? 1.4 : 1.6
    const proteinTargetG = Math.round(weightKg * multiplier)

    const profile: UserProfile = {
      id: 'local',
      heightCm,
      weightKg,
      age,
      sex,
      activityLevel: activity,
      calorieTarget: undefined,
      proteinTargetG,
      dietType,
    }

    await db.profile.put(profile)
    setSaving(false)
    onSaved?.(profile)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSave}
        className="card"
        style={{ width: 420, maxWidth: '90%' }}
      >
        <h3>Set your profile</h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginTop: 12,
          }}
        >
          <label>
            <span className="text-muted">Height (cm)</span>
            <input
              required
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              style={{ marginTop: 4 }}
            />
          </label>

          <label>
            <span className="text-muted">Weight (kg)</span>
            <input
              required
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              style={{ marginTop: 4 }}
            />
          </label>

          <label>
            <span className="text-muted">Age</span>
            <input
              required
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              style={{ marginTop: 4 }}
            />
          </label>

          <label>
            <span className="text-muted">Sex</span>
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value as any)}
              style={{ marginTop: 4 }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label style={{ gridColumn: '1 / -1' }}>
            <span className="text-muted">Activity level</span>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value as any)}
              style={{ marginTop: 4 }}
            >
              <option value="sedentary">Sedentary (desk)</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
            </select>
          </label>

          <label style={{ gridColumn: '1 / -1' }}>
            <span className="text-muted">Goal (protein multiplier)</span>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              style={{ marginTop: 4 }}
            >
              <option value="maintain">Maintain (1.2 g/kg)</option>
              <option value="build">
                Build muscle (1.6 g/kg) — recommended
              </option>
              <option value="lose">Lose weight (1.4 g/kg)</option>
            </select>
          </label>

          <label style={{ gridColumn: '1 / -1' }}>
            <span className="text-muted">Diet type</span>
            <select
              value={dietType}
              onChange={(e) =>
                setDietType(e.target.value as any)
              }
              style={{ marginTop: 4 }}
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
            </select>
          </label>
        </div>

        <div
          className="flex"
          style={{ justifyContent: 'flex-end', gap: 12, marginTop: 16 }}
        >
          <button type="button">Cancel</button>
          <button type="submit" className="primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
