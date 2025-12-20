// Food stored in IndexedDB (used for meal logs)
// This is what your meal-logger & consumedProtein logic expects.
export type DBFoodPer100g = {
    calories: number;
    protein: number;
    carbs?: number;
    fat?: number;
}

export type FoodItem = {
    id: string;                 // unique id used in meal logs
    name: string;
    per100g: DBFoodPer100g;     // macros per 100g
    defaultServing?: { label: string; grams: number };
    source?: string;
}

// Plan / seed food item (from plan_seed.json)
export type PlanFoodItem = {
    name: string;
    quantity: string;    // e.g. "120 g" or "2"
    protein: number;     // protein for the listed quantity (not per100g)
    carbs: number;
    fats: number;
    calories: number;

    // Optional micronutrients / metadata (ASCII keys; units in key name)
    fiber_g?: number;
    iron_mg?: number;
    sodium_mg?: number;
    calcium_mg?: number;
    magnesium_mg?: number;
    zinc_mg?: number;

    vitA_ug?: number;
    vitB1_mg?: number;
    vitB2_mg?: number;
    vitB3_mg?: number;
    vitB5_mg?: number;
    vitB6_mg?: number;
    vitB9_ug?: number;
    vitB12_ug?: number;
    vitC_mg?: number;
    vitD_IU?: number;
    vitE_mg?: number;
    vitK_ug?: number;

    keyAntioxidant?: string;
}

export type Meal = {
    mealNumber: number;
    items: PlanFoodItem[];
    total: {
        protein: number;
        carbs: number;
        fats: number;
        calories: number;

        // Optional micronutrient totals (if you choose to provide them in plan_seed.json)
        fiber_g?: number;
        iron_mg?: number;
        sodium_mg?: number;
        calcium_mg?: number;
        magnesium_mg?: number;
        zinc_mg?: number;

        vitA_ug?: number;
        vitB1_mg?: number;
        vitB2_mg?: number;
        vitB3_mg?: number;
        vitB5_mg?: number;
        vitB6_mg?: number;
        vitB9_ug?: number;
        vitB12_ug?: number;
        vitC_mg?: number;
        vitD_IU?: number;
        vitE_mg?: number;
        vitK_ug?: number;
    };
};

export type DietPlan = {
    type: 'vegetarian' | 'non-vegetarian';
    calories: number;
    meals: Meal[];
};

export type PlanSeed = {
    dietPlans: DietPlan[];
}

// existing user/profile types
export type UserProfile = {
    id: 'local';
    heightCm: number;
    weightKg: number;
    age?: number;
    sex?: 'male' | 'female' | 'other';
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
    calorieTarget?: number;
    proteinTargetG?: number;
    dietType?: 'vegetarian' | 'non-vegetarian';
}
