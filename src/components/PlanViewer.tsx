import React, { useEffect, useState } from 'react'
import planSeedJson from '../db/plan_seed.json'
import type { PlanSeed, DietPlan, Meal } from '../types'

const seed = planSeedJson as unknown as PlanSeed
const plans: DietPlan[] = seed.dietPlans ?? []

export default function PlanViewer(): JSX.Element {
    const [selectedIndex, setSelectedIndex] = useState<number>(
        plans.length > 0 ? 0 : -1
    )

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

    return (
        <div>
            {/* Header */}
            <div className="flex-between mt-3">
                <h2>Diet Plans</h2>

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
                                    </tr>
                                </thead>

                                <tbody>
                                    {meal.items.map((it, idx) => (
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
                                        </tr>
                                    ))}

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
