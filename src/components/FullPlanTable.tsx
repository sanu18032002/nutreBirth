import { useEffect, useMemo, useState } from 'react'
import type { Meal, PlanFoodItem } from '../types'
import { enrichPlanItemWithMicros } from '../utils/foodMicros'

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

export default function FullPlanTable({
    meals,
    kcal,
}: {
    meals: Meal[]
    kcal: number
}) {
    const planHasMicros = useMemo(() => {
        return meals.some((m) => m.items.some((it) => hasMicrosInItem(enrichPlanItemWithMicros(it))))
    }, [meals])

    const [showMicros, setShowMicros] = useState(false)

    useEffect(() => {
        setShowMicros(planHasMicros)
    }, [planHasMicros])

    return (
        <div className="mt-5">
            <div className="flex-between">
                <h3>{kcal} kcal Full Meal Plan</h3>
                <button onClick={() => setShowMicros((v) => !v)}>
                    {showMicros ? 'Hide micronutrients' : 'Show micronutrients'}
                </button>
            </div>
            {meals.map((meal) => (
                <div key={meal.mealNumber} className="card mt-3">
                    <div className="flex-between mt-1">
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
                                    <th style={{ textAlign: 'right' }}>Protein (g)</th>
                                    <th style={{ textAlign: 'right' }}>Carbs (g)</th>
                                    <th style={{ textAlign: 'right' }}>Fats (g)</th>
                                    <th style={{ textAlign: 'right' }}>Calories</th>
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
                                        <td style={{ textAlign: 'right' }}>{it.protein}</td>
                                        <td style={{ textAlign: 'right' }}>{it.carbs}</td>
                                        <td style={{ textAlign: 'right' }}>{it.fats}</td>
                                        <td style={{ textAlign: 'right' }}>{it.calories}</td>
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
                                    <td style={{ textAlign: 'right' }}>{meal.total.protein}</td>
                                    <td style={{ textAlign: 'right' }}>{meal.total.carbs}</td>
                                    <td style={{ textAlign: 'right' }}>{meal.total.fats}</td>
                                    <td style={{ textAlign: 'right' }}>{meal.total.calories}</td>
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
    )
}
