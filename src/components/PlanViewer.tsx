import { useEffect, useMemo, useState } from 'react'
import planSeedJson from '../db/plan_seed.json'
import type { PlanSeed, DietPlan, Meal, PlanFoodItem } from '../types'
import { enrichPlanItemWithMicros } from '../utils/foodMicros'

const seed = planSeedJson as unknown as PlanSeed
const plans: DietPlan[] = seed.dietPlans ?? []

function hasMicrosInItem(it: PlanFoodItem) {
    return (
        it.fiber_g != null ||
        it.iron_mg != null ||
        it.sodium_mg != null ||
        it.calcium_mg != null ||
        it.magnesium_mg != null ||
        it.zinc_mg != null ||
        it.vitA_ug != null ||
        it.vitB1_mg != null ||
        it.vitB2_mg != null ||
        it.vitB3_mg != null ||
        it.vitB5_mg != null ||
        it.vitB6_mg != null ||
        it.vitB9_ug != null ||
        it.vitB12_ug != null ||
        it.vitC_mg != null ||
        it.vitD_IU != null ||
        it.vitE_mg != null ||
        it.vitK_ug != null ||
        (it.keyAntioxidant != null && it.keyAntioxidant !== '')
    )
}

function fmt(v: number | undefined) {
    return v == null ? '—' : v
}

export default function PlanViewer(): JSX.Element {
    const [selectedIndex, setSelectedIndex] = useState<number>(
        plans.length > 0 ? 0 : -1
    )
    const [showMicros, setShowMicros] = useState(false)

    useEffect(() => {
        if (plans.length > 0 && selectedIndex === -1) setSelectedIndex(0)
        if (selectedIndex >= plans.length) setSelectedIndex(plans.length - 1)
    }, [plans, selectedIndex])

    if (plans.length === 0)
        return (
            <div style={{ textAlign: 'center', padding: '48px' }}>
                No diet plans available
            </div>
        )

    if (selectedIndex === -1)
        return (
            <div style={{ textAlign: 'center', padding: '48px' }}>
                Loading plans…
            </div>
        )

    const selectedPlan = plans[selectedIndex]
    const planHasMicros = useMemo(() => {
        return selectedPlan.meals.some((m) =>
            m.items.some((it) => hasMicrosInItem(enrichPlanItemWithMicros(it)))
        )
    }, [selectedPlan])

    useEffect(() => {
        // auto-enable micros if any item contains micros in the selected plan
        setShowMicros(planHasMicros)
    }, [planHasMicros, selectedIndex])

    return (
        <div>
            {/* Header */}
            <div className="flex-between mt-3">
                <h2>Diet Plans</h2>

                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <button onClick={() => setShowMicros((v) => !v)}>
                        {showMicros ? 'Hide micronutrients' : 'Show micronutrients'}
                    </button>

                    <select
                        value={selectedIndex}
                        onChange={(e) => setSelectedIndex(Number(e.target.value))}
                        style={{ width: 220 }}
                    >
                        {plans.map((p, i) => (
                            <option key={`${p.type}-${p.calories}`} value={i}>
                                {p.calories} kcal — {p.type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Meals */}
            <div className="mt-4">
                {selectedPlan.meals.map((meal: Meal) => (
                    <div key={meal.mealNumber} className="card mt-3">
                        <div className="flex-between">
                            <h4>Meal {meal.mealNumber}</h4>
                            <span className="text-muted">
                                {meal.total.calories} kcal
                            </span>
                        </div>

                        <div style={{ overflowX: 'auto', marginTop: 8 }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Food Item</th>
                                        <th>Qty</th>
                                        <th style={{ textAlign: 'right' }}>
                                            Protein (g)
                                        </th>
                                        <th style={{ textAlign: 'right' }}>
                                            Carbs (g)
                                        </th>
                                        <th style={{ textAlign: 'right' }}>
                                            Fats (g)
                                        </th>
                                        <th style={{ textAlign: 'right' }}>
                                            Calories
                                        </th>
                                        {showMicros && (
                                            <>
                                                <th style={{ textAlign: 'right' }}>Fiber (g)</th>
                                                <th style={{ textAlign: 'right' }}>Iron (mg)</th>
                                                <th style={{ textAlign: 'right' }}>Sodium (mg)</th>
                                                <th style={{ textAlign: 'right' }}>Calcium (mg)</th>
                                                <th style={{ textAlign: 'right' }}>Magnesium (mg)</th>
                                                <th style={{ textAlign: 'right' }}>Zinc (mg)</th>
                                                <th style={{ textAlign: 'right' }}>Vit A (µg)</th>
                                                <th style={{ textAlign: 'right' }}>B1 (mg)</th>
                                                <th style={{ textAlign: 'right' }}>B2 (mg)</th>
                                                <th style={{ textAlign: 'right' }}>B3 (mg)</th>
                                                <th style={{ textAlign: 'right' }}>B5 (mg)</th>
                                                <th style={{ textAlign: 'right' }}>B6 (mg)</th>
                                                <th style={{ textAlign: 'right' }}>B9 (µg)</th>
                                                <th style={{ textAlign: 'right' }}>B12 (µg)</th>
                                                <th style={{ textAlign: 'right' }}>Vit C (mg)</th>
                                                <th style={{ textAlign: 'right' }}>Vit D (IU)</th>
                                                <th style={{ textAlign: 'right' }}>Vit E (mg)</th>
                                                <th style={{ textAlign: 'right' }}>Vit K (µg)</th>
                                                <th>Key antioxidant</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>

                                <tbody>
                                    {meal.items.map((raw, idx) => {
                                        const it = enrichPlanItemWithMicros(raw)
                                        return (
                                        <tr key={idx}>
                                            <td>{it.name}</td>
                                            <td>{it.quantity}</td>
                                            <td style={{ textAlign: 'right' }}>
                                                {it.protein}
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                {it.carbs}
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                {it.fats}
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                {it.calories}
                                            </td>
                                            {showMicros && (
                                                <>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.fiber_g)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.iron_mg)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.sodium_mg)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.calcium_mg)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.magnesium_mg)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.zinc_mg)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.vitA_ug)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.vitB1_mg)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.vitB2_mg)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.vitB3_mg)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.vitB5_mg)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.vitB6_mg)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.vitB9_ug)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.vitB12_ug)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.vitC_mg)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.vitD_IU)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.vitE_mg)}</td>
                                                    <td style={{ textAlign: 'right' }}>{fmt(it.vitK_ug)}</td>
                                                    <td>{it.keyAntioxidant ?? '—'}</td>
                                                </>
                                            )}
                                        </tr>
                                        )
                                    })}

                                    <tr className="total">
                                        <td>TOTAL</td>
                                        <td></td>
                                        <td style={{ textAlign: 'right' }}>
                                            {meal.total.protein}
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            {meal.total.carbs}
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            {meal.total.fats}
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            {meal.total.calories}
                                        </td>
                                        {showMicros && (
                                            <>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.fiber_g)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.iron_mg)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.sodium_mg)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.calcium_mg)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.magnesium_mg)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.zinc_mg)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.vitA_ug)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.vitB1_mg)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.vitB2_mg)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.vitB3_mg)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.vitB5_mg)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.vitB6_mg)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.vitB9_ug)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.vitB12_ug)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.vitC_mg)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.vitD_IU)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.vitE_mg)}</td>
                                                <td style={{ textAlign: 'right' }}>{fmt(meal.total.vitK_ug)}</td>
                                                <td></td>
                                            </>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
