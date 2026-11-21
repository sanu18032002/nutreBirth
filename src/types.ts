// Food stored in IndexedDB (used for meal logs)
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
    protein: number;     // protein for the listed quantity
    carbs: number;
    fats: number;
    calories: number;

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

/* ======================================================== */
/* NutReBirth Mobile Protocol Trajectory Engine Types       */
/* ======================================================== */

export type TrackId = 'clinical' | 'maternal' | 'athletic' | 'rehab' | 'combat';

export type NutritionRule = {
    type: 'EXCLUDE' | 'REQUIRE' | 'LIMIT' | 'PRIORITY';
    text: string;
    color: string;
}

export type ExerciseRule = {
    type: 'APPROVED' | 'VETOED' | 'PRIORITY' | 'MODIFIED';
    text: string;
    color: string;
}

export type MealProtocolItem = {
    meal: string;
    food: string;
    qty: string;
    macros: string;
}

export type WorkoutProtocolItem = {
    name: string;
    sets: string;
    notes: string;
}

export type TrackProtocolData = {
    id: TrackId;
    title: string;
    subtitle: string;
    icon: string;
    badgeColor: string;
    bgAccent: string;
    dailyTargets: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    };
    nutritionRules: NutritionRule[];
    exerciseRules: ExerciseRule[];
    mealPlans: MealProtocolItem[];
    workoutPlans: WorkoutProtocolItem[];
}

export type IntakeDiagnostics = {
    age?: number;
    sex?: 'Male' | 'Female';
    weightKg?: number;
    heightCm?: number;
    activityLevel?: string;
    dietaryPreference?: string;
    avgSleep?: string;
    stressMood?: string;
    jointLimitations?: string[];
    wearables?: string[];
}

// User Profile extended for NutReBirth
export type UserProfile = {
    id: 'local';
    heightCm: number;
    weightKg: number;
    age?: number;
    sex?: 'male' | 'female' | 'other';
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
    goal?: 'maintain' | 'build' | 'lose';
    calorieTarget?: number;
    proteinTargetG?: number;
    dietType?: 'vegetarian' | 'non-vegetarian';
    
    // New NutReBirth fields
    phone?: string;
    trackId?: TrackId;
    intake?: IntakeDiagnostics;
    medicalConsultTime?: string;
    coachBooked?: boolean;
}
