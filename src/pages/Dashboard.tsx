import React, { useEffect, useState } from 'react'
import { db, seedIfEmpty } from '../db'
import type { Meal, FoodItem, UserProfile, DietPlan } from '../types'
import ProgressCard from '../components/ProgressCard'
import ProfileModal from '../components/ProfileModal'
import FullPlanTable from '../components/FullPlanTable'
import planSeedData from '../db/plan_seed.json'
import { calcBMR, calcTDEE } from '../utils/calcTargets'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale)

export default function Dashboard() {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [todayLogs, setTodayLogs] = useState<Meal[]>([])
    const [foods, setFoods] = useState<FoodItem[]>([])
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [targets, setTargets] = useState({ bmr: 0, tdee: 0, protein: 0 })
    const [recommendedPlan, setRecommendedPlan] = useState<DietPlan | null>(null)

    const plans = (planSeedData as any).dietPlans as DietPlan[]

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

    async function onProfileSaved(p: UserProfile) {
        setProfile(p)
        setShowProfileModal(false)
        computeAndSetTargets(p)
    }

    function computeAndSetTargets(p: UserProfile) {
        const bmr = calcBMR(
            p.weightKg,
            p.heightCm,
            p.age ?? 30,
            p.sex ?? 'male'
        )
        const tdee = calcTDEE(bmr, p.activityLevel ?? 'moderate')
        const proteinDefault = Math.round(p.weightKg * 1.6)
        const protein = Math.round(p.proteinTargetG ?? proteinDefault)

        setTargets({ bmr, tdee, protein })

        db.profile
            .put({ ...p, calorieTarget: tdee, proteinTargetG: protein })
            .catch(() => { })

        selectRecommendedPlan(tdee, p.dietType ?? 'vegetarian')
    }

    function findClosestPlanForType(tdee: number, dietType: string) {
        const filtered = plans.filter((x) => x.type === dietType)
        if (filtered.length === 0) return null

        let best = filtered[0]
        let bestDiff = Math.abs(filtered[0].calories - tdee)

        for (const p of filtered) {
            const d = Math.abs(p.calories - tdee)
            if (d < bestDiff) {
                best = p
                bestDiff = d
            }
        }
        return best
    }

    function selectRecommendedPlan(tdee: number, dietType: string) {
        const plan = findClosestPlanForType(tdee, dietType)
        setRecommendedPlan(plan)
    }

    useEffect(() => {
        if (profile && targets.tdee) {
            selectRecommendedPlan(
                targets.tdee,
                profile.dietType ?? 'vegetarian'
            )
        }
    }, [profile, targets.tdee])

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
        <div>
            {/* Top cards */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                }}
            >
                <ProgressCard
                    label="Protein (g)"
                    value={consumedProtein}
                    target={targets.protein}
                    onClick={() => setShowProfileModal(true)}
                />

                <div className="card">
                    <span className="text-muted">Targets</span>
                    <h3 style={{ marginTop: 6 }}>
                        {targets.tdee} kcal / day
                    </h3>
                    <p className="text-muted">{targets.bmr} kcal (BMR)</p>
                    <p className="text-muted">
                        {targets.protein} g protein (target)
                    </p>

                    <div style={{ marginTop: 12 }}>
                        <button
                            className="primary"
                            onClick={() => setShowProfileModal(true)}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Recommended plan */}
            <section className="mt-5">
                <h3>Recommended plan</h3>

                {recommendedPlan ? (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 16,
                            marginTop: 12,
                        }}
                    >
                        <div className="card">
                            <h4>{recommendedPlan.calories} kcal plan</h4>
                            <p className="text-muted mt-2">
                                Matches your estimated TDEE (
                                {targets.tdee} kcal)
                            </p>
                            <p className="mt-2">
                                Representative protein:{' '}
                                <strong>
                                    {recommendedPlan.meals.reduce(
                                        (s, m) =>
                                            s + (m.total?.protein ?? 0),
                                        0
                                    )}{' '}
                                    g
                                </strong>
                            </p>
                        </div>

                        <div className="card">
                            <span className="text-muted">Visual</span>
                            <div style={{ marginTop: 12 }}>
                                <Bar
                                    data={{
                                        labels: ['Protein'],
                                        datasets: [
                                            {
                                                label: 'Target',
                                                data: [targets.protein],
                                                backgroundColor: cssVar('--protein'),
                                            },
                                            {
                                                label: 'Consumed',
                                                data: [Math.round(consumedProtein)],
                                                backgroundColor: cssVar('--consumed'),
                                            },
                                        ],
                                    }}
                                    options={{
                                        indexAxis: 'y',
                                        responsive: true,
                                        maintainAspectRatio: false,

                                        plugins: {
                                            legend: { display: false },
                                        },

                                        scales: {
                                            x: {
                                                ticks: {
                                                    color: cssVar('--text-muted'),
                                                },
                                                grid: {
                                                    color: cssVar('--border'),
                                                    display: false,
                                                },
                                            },
                                            y: {
                                                ticks: {
                                                    color: cssVar('--text-muted'),
                                                },
                                                grid: {
                                                    display: false,
                                                },
                                            },
                                        },
                                    }}
                                />


                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-muted mt-2">
                        Profile not set or no matching plan found.
                    </p>
                )}
            </section>

            {/* Full plan */}
            {recommendedPlan && (
                <div className="mt-5">
                    <FullPlanTable
                        meals={recommendedPlan.meals}
                        kcal={recommendedPlan.calories}
                    />
                </div>
            )}

            {showProfileModal && (
                <ProfileModal
                    onSaved={onProfileSaved}
                    initialProfile={profile ?? undefined}
                />
            )}
        </div>
    )
}
