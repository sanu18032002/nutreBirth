import { useEffect, useState } from 'react'
import { db, seedIfEmpty } from '../db'
import type { Meal, FoodItem, UserProfile, DietPlan, PlanSeed } from '../types'
import ProgressCard from '../components/ProgressCard'
import ProfileModal from '../components/ProfileModal'
import FullPlanTable from '../components/FullPlanTable'
import planSeedData from '../db/plan_seed.json'
import { calcBMR, calcTDEE, calcCalorieTarget, calcProteinTarget, Goal } from '../utils/calcTargets'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js'
import PremiumGate from '../components/PremiumGate'

ChartJS.register(BarElement, CategoryScale, LinearScale)

export default function Dashboard() {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [todayLogs, setTodayLogs] = useState<Meal[]>([])
    const [foods, setFoods] = useState<FoodItem[]>([])
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [targets, setTargets] = useState({
        bmr: 0,
        tdee: 0,
        calorieTarget: 0,
        protein: 0,
        goal: 'build' as Goal,
    })
    const [recommendedPlan, setRecommendedPlan] = useState<DietPlan | null>(null)

    const seed = planSeedData as unknown as PlanSeed
    const plans = seed.dietPlans ?? []

    useEffect(() => {
        ; (async () => {
            await seedIfEmpty()

            const p = await db.profile.get('local')

            const incomplete =
                !p ||
                !p.heightCm ||
                !p.weightKg ||
                !p.age ||
                !p.sex ||
                !p.activityLevel

            if (incomplete) {
                setShowProfileModal(true)
            } else {
                setProfile(p)
                computeAndSetTargets(p)
            }

            const f = await db.foods.toArray()
            setFoods(f)

            const today = new Date().toISOString().slice(0, 10)
            const logs = await db.meals.where('date').equals(today).toArray()
            setTodayLogs(logs)
        })()
    }, [])

    // Allow top-bar "Profile" action to open ProfileModal on Dashboard.
    useEffect(() => {
        try {
            const url = new URL(window.location.href)
            if (url.searchParams.get('profile') === '1') {
                setShowProfileModal(true)
                url.searchParams.delete('profile')
                window.history.replaceState({}, '', url.toString())
            }
        } catch {
            // ignore
        }
    }, [])

    async function onProfileSaved(p: UserProfile) {
        setProfile(p)
        setShowProfileModal(false)
        computeAndSetTargets(p)
    }

    function computeAndSetTargets(p: UserProfile) {
        const goal = p.goal ?? 'build'
        const bmr = calcBMR(
            p.weightKg,
            p.heightCm,
            p.age ?? 30,
            p.sex ?? 'male'
        )
        const tdee = calcTDEE(bmr, p.activityLevel ?? 'moderate')
        const calorieTarget = calcCalorieTarget(tdee, bmr, goal)
        const protein = p.proteinTargetG ?? calcProteinTarget(p.weightKg, goal)

        setTargets({ bmr, tdee, calorieTarget, protein, goal })

        db.profile
            .put({ ...p, calorieTarget, proteinTargetG: protein, goal })
            .catch(() => { })

        selectRecommendedPlan(calorieTarget, p.dietType ?? 'vegetarian')
    }

    function findClosestPlanForType(calories: number, dietType: string) {
        const filtered = plans.filter((x) => x.type === dietType)
        if (filtered.length === 0) return null

        let best = filtered[0]
        let bestDiff = Math.abs(filtered[0].calories - calories)

        for (const p of filtered) {
            const d = Math.abs(p.calories - calories)
            if (d < bestDiff) {
                best = p
                bestDiff = d
            }
        }
        return best
    }

    function selectRecommendedPlan(calories: number, dietType: string) {
        const plan = findClosestPlanForType(calories, dietType)
        setRecommendedPlan(plan)
    }

    useEffect(() => {
        if (profile && targets.calorieTarget) {
            selectRecommendedPlan(
                targets.calorieTarget,
                profile.dietType ?? 'vegetarian'
            )
        }
    }, [profile, targets.calorieTarget])

    const consumedProtein = todayLogs
        .flatMap((l) => (l as any).items ?? [])
        .reduce((sum, it: any) => {
            const fi = foods.find((f) => f.id === it.foodId)
            if (fi && fi.per100g?.protein) {
                return sum + (fi.per100g.protein * it.grams) / 100
            }
            return sum
        }, 0)

    function cssVar(name: string) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(name)
            .trim()
    }


    return (
        <div style={{ paddingBottom: 24 }}>
            {/* Top cards */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: 20,
                    marginTop: 8,
                }}
            >
                <div className="card" style={{ padding: '24px 28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span className="text-muted" style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.05em' }}>
                                Daily Target
                            </span>
                            <span style={{
                                fontSize: 11,
                                fontWeight: 700,
                                padding: '3px 8px',
                                borderRadius: 999,
                                background: targets.goal === 'lose' ? 'rgba(239, 68, 68, 0.12)' : targets.goal === 'build' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(14, 165, 233, 0.12)',
                                color: targets.goal === 'lose' ? '#ef4444' : targets.goal === 'build' ? 'var(--brand)' : '#0ea5e9',
                            }}>
                                {targets.goal === 'lose' ? '📉 Weight Loss Deficit' : targets.goal === 'build' ? '💪 Muscle Building Surplus' : '⚖️ Maintenance'}
                            </span>
                        </div>
                        <button
                            className="primary"
                            onClick={() => setShowProfileModal(true)}
                            style={{ padding: '6px 14px', fontSize: 13 }}
                        >
                            Edit Profile
                        </button>
                    </div>

                    <div style={{ marginTop: 12 }}>
                        <h2 style={{ margin: 0, fontSize: '1.75rem', color: 'var(--brand)' }}>
                            {targets.calorieTarget || targets.tdee} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>kcal / day</span>
                        </h2>
                    </div>

                    <div style={{ display: 'flex', gap: 28, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
                        <div>
                            <span className="text-muted" style={{ fontSize: 12 }}>Maintenance (TDEE)</span>
                            <div style={{ fontWeight: 600, marginTop: 2 }}>{targets.tdee} kcal</div>
                        </div>
                        <div>
                            <span className="text-muted" style={{ fontSize: 12 }}>Basal Rate (BMR)</span>
                            <div style={{ fontWeight: 600, marginTop: 2 }}>{targets.bmr} kcal</div>
                        </div>
                        <div>
                            <span className="text-muted" style={{ fontSize: 12 }}>Protein Target</span>
                            <div style={{ fontWeight: 600, marginTop: 2 }}>{targets.protein} g</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommended plan */}
            <section style={{ marginTop: 32 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16 }}>Recommended plan</h3>

                {recommendedPlan ? (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: 20,
                        }}
                    >
                        <div className="card" style={{ padding: '24px 28px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <h4 style={{ fontSize: '1.2rem', margin: 0 }}>{recommendedPlan.calories} kcal plan</h4>
                                <span style={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    padding: '4px 10px',
                                    borderRadius: 999,
                                    background: 'rgba(16, 185, 129, 0.12)',
                                    color: 'var(--brand)',
                                }}>
                                    {recommendedPlan.type === 'vegetarian' ? '🌱 Vegetarian' : '🍗 Non-Vegetarian'}
                                </span>
                            </div>
                            <p className="text-muted mt-2">
                                Matches your goal target of <strong>{targets.calorieTarget || targets.tdee} kcal</strong> ({targets.goal === 'lose' ? 'deficit' : targets.goal === 'build' ? 'surplus' : 'maintenance'})
                            </p>
                            <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', gap: 28 }}>
                                <div>
                                    <span className="text-muted" style={{ fontSize: 12 }}>Representative protein</span>
                                    <div style={{ fontWeight: 600, marginTop: 2 }}>
                                        {recommendedPlan.meals.reduce(
                                            (s, m) => s + (m.total?.protein ?? 0),
                                            0
                                        )}{' '}g
                                    </div>
                                </div>
                                <div>
                                    <span className="text-muted" style={{ fontSize: 12 }}>Meals</span>
                                    <div style={{ fontWeight: 600, marginTop: 2 }}>
                                        {recommendedPlan.meals.length} meals / day
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="card" style={{ padding: '24px 28px' }}>
                        <p className="text-muted">
                            Profile not set or no matching plan found.
                        </p>
                    </div>
                )}
            </section>

            {/* Full plan */}
            <section style={{ marginTop: 36 }}>
                <PremiumGate featureName="Full diet plan">
                    {recommendedPlan && (
                        <div style={{ marginTop: 20 }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16 }}>Full Diet Plan Details</h3>
                            <FullPlanTable
                                meals={recommendedPlan.meals}
                                kcal={recommendedPlan.calories}
                            />
                        </div>
                    )}
                </PremiumGate>
            </section>

            {showProfileModal && (
                <ProfileModal
                    onSaved={onProfileSaved}
                    onClose={() => setShowProfileModal(false)}
                    initialProfile={profile ?? undefined}
                />
            )}
        </div>
    )
}
