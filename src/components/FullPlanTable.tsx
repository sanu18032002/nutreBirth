import type { Meal } from '../types'

export default function FullPlanTable({
    meals,
    kcal,
}: {
    meals: Meal[]
    kcal: number
}) {
    return (
        <div className="mt-5">
            <h3>{kcal} kcal Full Meal Plan</h3>

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
                                </tr>
                            </thead>

                            <tbody>
                                {meal.items.map((it, idx) => (
                                    <tr key={idx}>
                                        <td>{it.name}</td>
                                        <td>{it.quantity}</td>
                                        <td style={{ textAlign: 'right' }}>{it.protein}</td>
                                        <td style={{ textAlign: 'right' }}>{it.carbs}</td>
                                        <td style={{ textAlign: 'right' }}>{it.fats}</td>
                                        <td style={{ textAlign: 'right' }}>{it.calories}</td>
                                    </tr>
                                ))}

                                <tr className="total">
                                    <td>TOTAL</td>
                                    <td></td>
                                    <td style={{ textAlign: 'right' }}>{meal.total.protein}</td>
                                    <td style={{ textAlign: 'right' }}>{meal.total.carbs}</td>
                                    <td style={{ textAlign: 'right' }}>{meal.total.fats}</td>
                                    <td style={{ textAlign: 'right' }}>{meal.total.calories}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    )
}
