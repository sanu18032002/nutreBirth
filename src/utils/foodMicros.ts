import type { PlanFoodItem } from '../types'
import foodMicrosSeed from '../db/food_micros_seed.json'

type FoodMicrosRow = Record<string, unknown>

// For tricky mismatches between plan item names and micros seed names.
// Keys and values are normalized via normalizeFoodName().
const NAME_ALIASES: Record<string, string> = {
  // Plans often use generic names; micros data may be more specific.
  'paneer': 'paneer full fat',
  'greek yogurt': 'greek yogurt low fat',
  'whole eggs': 'whole eggs boiled',
  'egg whites': 'egg whites boiled',
  'chicken breast': 'chicken breast cooked',
  'fish': 'atlantic salmon cooked',
}

function normalizeFoodName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, '') // remove parentheses
    .replace(/,/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function num(v: unknown): number | undefined {
  if (v == null) return undefined
  if (typeof v === 'number') return Number.isFinite(v) ? v : undefined
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v)
    return Number.isFinite(n) ? n : undefined
  }
  return undefined
}

function str(v: unknown): string | undefined {
  if (typeof v === 'string') {
    const t = v.trim()
    return t === '' ? undefined : t
  }
  return undefined
}

function getRowName(row: FoodMicrosRow): string | undefined {
  return str(row['Food Item']) ?? str(row['foodItem']) ?? str(row['name'])
}

function toMicros(row: FoodMicrosRow): Partial<PlanFoodItem> {
  // Source file uses keys like "Iron (mg)", "Vit A (µg)", etc.
  return {
    fiber_g: num(row['Fiber']),
    iron_mg: num(row['Iron (mg)']),
    sodium_mg: num(row['Sodium (mg)']),
    calcium_mg: num(row['Calcium (mg)']),
    magnesium_mg: num(row['Magnesium (mg)']),
    zinc_mg: num(row['Zinc (mg)']),

    vitA_ug: num(row['Vit A (µg)']),
    vitB1_mg: num(row['Vit B1 (mg)']),
    vitB2_mg: num(row['Vit B2 (mg)']),
    vitB3_mg: num(row['Vit B3 (mg)']),
    vitB5_mg: num(row['Vit B5 (mg)']),
    vitB6_mg: num(row['Vit B6 (mg)']),
    vitB9_ug: num(row['Vit B9 (µg)']),
    vitB12_ug: num(row['Vit B12 (µg)']),
    vitC_mg: num(row['Vit C (mg)']),
    vitD_IU: num(row['Vit D (IU)']),
    vitE_mg: num(row['Vit E (mg)']),
    vitK_ug: num(row['Vit K (µg)']),

    keyAntioxidant: str(row['Key Antioxidant']),
  }
}

const rows = (foodMicrosSeed as unknown as FoodMicrosRow[]) ?? []
const byName = new Map<string, Partial<PlanFoodItem>>()

for (const r of rows) {
  const n = getRowName(r)
  if (!n) continue
  byName.set(normalizeFoodName(n), toMicros(r))
}

export function microsForFoodName(name: string): Partial<PlanFoodItem> | undefined {
  const keyRaw = normalizeFoodName(name)

  const alias = NAME_ALIASES[keyRaw]
  const key = alias ? normalizeFoodName(alias) : keyRaw

  // exact normalized match first
  const exact = byName.get(key)
  if (exact) return exact

  // fallback: strip common suffixes if present
  const simplified = key
    .replace(/\braw\b/g, '')
    .replace(/\bcooked\b/g, '')
    .replace(/\bboiled\b/g, '')
    .replace(/\bgrilled\b/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return byName.get(simplified)
}

export function enrichPlanItemWithMicros(it: PlanFoodItem): PlanFoodItem {
  const lookup = microsForFoodName(it.name)
  if (!lookup) return it
  // do not override if plan already provides a value
  return { ...lookup, ...it }
}


