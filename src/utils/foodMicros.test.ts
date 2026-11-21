import { describe, expect, it } from 'vitest'
import { microsForFoodName } from './foodMicros'

describe('foodMicros name matching', () => {
  it('matches exact food names', () => {
    const m = microsForFoodName('Walnuts')
    expect(m).toBeTruthy()
    expect(m?.iron_mg).toBeTypeOf('number')
  })

  it('matches names with parentheses removed', () => {
    const m = microsForFoodName('Paneer (cottage cheese)')
    expect(m).toBeTruthy()
  })

  it('matches via alias map for generic plan names', () => {
    const m = microsForFoodName('Greek Yogurt')
    expect(m).toBeTruthy()

    expect(microsForFoodName('Fish (Salmon, grilled)')).toBeTruthy()
    expect(microsForFoodName('Fish (grilled)')).toBeTruthy()
    expect(microsForFoodName('Rajma (cooked)')).toBeTruthy()
    expect(microsForFoodName('Soya Chunks (raw)')).toBeTruthy()
    expect(microsForFoodName('Brown Rice (cooked)')).toBeTruthy()
  })
})


