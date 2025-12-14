import Dexie from 'dexie'
import type { FoodItem, Meal, UserProfile } from '../types'
import seedData from './seed.json'


export class AppDB extends Dexie {
    foods!: Dexie.Table<FoodItem, string>
    meals!: Dexie.Table<Meal, string>
    profile!: Dexie.Table<UserProfile, string>


    constructor() {
        super('nutrition-db')
        this.version(1).stores({
            foods: 'id, name, source',
            meals: 'id, date',
            profile: 'id'
        })
    }
}


export const db = new AppDB()


export async function seedIfEmpty() {
    const count = await db.foods.count()
    if (count === 0) {
        // seed from seed.json
        await db.foods.bulkAdd(seedData.foods)
        await db.profile.put({ id: 'local', heightCm: 170, weightKg: 70, activityLevel: 'moderate', proteinTargetG: 100 })
    }
}