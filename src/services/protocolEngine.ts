import type { TrackId, TrackProtocolData, IntakeDiagnostics } from '../types'

export const TRACK_METADATA: Record<TrackId, { title: string; subtitle: string; icon: string; badgeColor: string; bgAccent: string }> = {
    maternal: {
        title: 'Pre & Post-Natal',
        subtitle: 'Pregnancy safety, folate focus, pelvic floor.',
        icon: '👶',
        badgeColor: 'var(--accent-pink)',
        bgAccent: 'rgba(255, 64, 129, 0.1)',
    },
    clinical: {
        title: 'Chronic Disease Reversal',
        subtitle: 'Diabetes, PCOS, glycemic & endocrine control.',
        icon: '🩺',
        badgeColor: 'var(--accent-yellow)',
        bgAccent: 'rgba(255, 193, 7, 0.1)',
    },
    athletic: {
        title: 'Athletic Performance',
        subtitle: 'Macro-cycling, power output, CNS tracking.',
        icon: '⚡',
        badgeColor: 'var(--accent-cyan)',
        bgAccent: 'rgba(0, 212, 255, 0.1)',
    },
    rehab: {
        title: 'Injury Prevention & Rehab',
        subtitle: 'Correctional exercise, joint health, mobility.',
        icon: '🦴',
        badgeColor: 'var(--accent-green)',
        bgAccent: 'rgba(0, 255, 136, 0.1)',
    },
    combat: {
        title: 'Combat Sport Specific',
        subtitle: 'Weight cutting, ballistic power, gas tank prep.',
        icon: '🥊',
        badgeColor: '#ff4444',
        bgAccent: 'rgba(255, 0, 0, 0.1)',
    },
}

export const PROTOCOL_DATA: Record<TrackId, TrackProtocolData> = {
    clinical: {
        id: 'clinical',
        title: 'Chronic Disease Protocol',
        subtitle: 'Diabetes, PCOS, Glycemic & Endocrine Optimization',
        icon: '🩺',
        badgeColor: 'var(--accent-yellow)',
        bgAccent: 'rgba(255, 193, 7, 0.1)',
        dailyTargets: {
            calories: 1950,
            protein: 135,
            carbs: 160,
            fat: 55,
        },
        nutritionRules: [
            { type: 'EXCLUDE', text: 'High Glycemic Foods (ICMR/FDA Ref: Glucose Spike)', color: 'var(--accent-pink)' },
            { type: 'REQUIRE', text: 'High Fiber > 35g/day (Insulin Sensitivity)', color: 'var(--accent-cyan)' },
            { type: 'LIMIT', text: 'Simple Sugars & Processed Seed Oils', color: 'var(--accent-yellow)' },
        ],
        exerciseRules: [
            { type: 'APPROVED', text: 'Zone 2 LISS (Mitochondrial biogenesis & glucose clearing)', color: 'var(--accent-green)' },
            { type: 'APPROVED', text: 'Low-impact Hypertrophy (Muscle glucose sink)', color: 'var(--accent-green)' },
            { type: 'VETOED', text: 'Extreme HIIT (Cortisol/Insulin disruption)', color: 'var(--accent-pink)' },
        ],
        mealPlans: [
            { meal: 'Breakfast', food: 'Moong Dal Chilla with Mint Chutney', qty: '60g Moong Dal (raw/dry weight), 30g Chutney', macros: 'P: 22g | C: 35g (Low GI) | F: 8g' },
            { meal: 'Lunch', food: 'Grilled Chicken & Quinoa Salad', qty: '150g Chicken (raw), 50g Quinoa (dry), 10ml Olive Oil', macros: 'P: 45g | C: 40g | F: 15g' },
            { meal: 'Dinner', food: 'Baked Salmon with Steamed Broccoli', qty: '120g Salmon (raw), 150g Broccoli', macros: 'P: 40g | C: 15g | F: 22g' },
        ],
        workoutPlans: [
            { name: 'Post-Meal Brisk Walk', sets: '15 Mins', notes: 'Glucose clearing mechanism immediately post feeding.' },
            { name: 'Resistance Band Squats', sets: '3 Sets x 12 Reps', notes: 'Build lower body muscle insulin sensitivity.' },
            { name: 'Incline Planks', sets: '3 Sets x 30 Secs', notes: 'Core stability without high intra-abdominal pressure.' },
        ],
    },

    maternal: {
        id: 'maternal',
        title: 'Pre/Post-Natal Protocol',
        subtitle: 'Folate, Calcium Density & Safe Postural Biomechanics',
        icon: '👶',
        badgeColor: 'var(--accent-pink)',
        bgAccent: 'rgba(255, 64, 129, 0.1)',
        dailyTargets: {
            calories: 2200,
            protein: 120,
            carbs: 240,
            fat: 65,
        },
        nutritionRules: [
            { type: 'EXCLUDE', text: 'Raw Seafood / High Mercury & Unpasteurized Dairy (FDA Ref)', color: 'var(--accent-pink)' },
            { type: 'REQUIRE', text: 'High Folate, Choline & Calcium Density (> 1000mg/day)', color: 'var(--accent-green)' },
            { type: 'PRIORITY', text: 'Adequate Hydration & Electrolytes (Amniotic volume)', color: 'var(--accent-cyan)' },
        ],
        exerciseRules: [
            { type: 'APPROVED', text: 'Seated & Supported Compound Lifts (Spine neutral)', color: 'var(--accent-green)' },
            { type: 'APPROVED', text: 'Pelvic Floor & Transverse Abdominis Activation', color: 'var(--accent-cyan)' },
            { type: 'VETOED', text: 'Supine (Back-laying) exercises after Trimester 1', color: 'var(--accent-pink)' },
            { type: 'VETOED', text: 'Heavy Valsalva Maneuver (Core breath holding)', color: 'var(--accent-pink)' },
        ],
        mealPlans: [
            { meal: 'Breakfast', food: 'Spinach & Feta Omelette (Folate/Calcium)', qty: '3 Whole Eggs, 50g Spinach, 30g Feta Cheese', macros: 'P: 25g | C: 10g | F: 18g' },
            { meal: 'Lunch', food: 'Lentil Soup & Roasted Sweet Potato (Iron)', qty: '200ml Lentil Soup (thick), 150g Sweet Potato (raw)', macros: 'P: 20g | C: 55g | F: 12g' },
            { meal: 'Dinner', food: 'Pasteurized Greek Yogurt Parfait with Seeds', qty: '200g Greek Yogurt, 50g Mixed Berries, 15g Chia', macros: 'P: 20g | C: 30g | F: 5g' },
        ],
        workoutPlans: [
            { name: 'Seated Cable Rows', sets: '3 Sets x 12 Reps', notes: 'Strengthens upper thoracic posture against forward belly load.' },
            { name: 'Bird-Dog Extensions', sets: '3 Sets x 10 / side', notes: 'Safe rotational core stabilization without intra-abdominal strain.' },
            { name: 'Incline Push-ups', sets: '3 Sets x 10 Reps', notes: 'Pectoral strength while alleviating diastasis recti pressure.' },
        ],
    },

    athletic: {
        id: 'athletic',
        title: 'Peak Athlete Protocol',
        subtitle: 'Carbohydrate Periodization & CNS Power Modulation',
        icon: '⚡',
        badgeColor: 'var(--accent-cyan)',
        bgAccent: 'rgba(0, 212, 255, 0.1)',
        dailyTargets: {
            calories: 2650,
            protein: 175,
            carbs: 275,
            fat: 70,
        },
        nutritionRules: [
            { type: 'REQUIRE', text: 'Targeted Carbohydrate Cycling (High Pre/Intra Training)', color: 'var(--accent-cyan)' },
            { type: 'REQUIRE', text: 'Leucine Threshold (3g+ per meal for MPS)', color: 'var(--accent-green)' },
            { type: 'LIMIT', text: 'Fat intake in the 2-hour pre/post workout window', color: 'var(--accent-yellow)' },
        ],
        exerciseRules: [
            { type: 'PRIORITY', text: 'Ballistic / Plyometric Power Modules (High motor unit recruitment)', color: 'var(--accent-cyan)' },
            { type: 'APPROVED', text: 'Heavy Compound Overload (1-5RM force production)', color: 'var(--accent-green)' },
            { type: 'MODIFIED', text: 'Auto-regulated Volume based on Morning HRV / CNS read', color: 'var(--accent-yellow)' },
        ],
        mealPlans: [
            { meal: 'Pre-Workout', food: 'Rice Cakes, Pure Honey & Whey Isolate', qty: '3x Rice Cakes, 15g Honey, 1 Scoop (30g) Whey', macros: 'P: 30g | C: 50g | F: 2g' },
            { meal: 'Post-Workout', food: 'Chicken Breast & Jasmine White Rice', qty: '200g Chicken (raw), 100g Rice (dry)', macros: 'P: 55g | C: 80g | F: 5g' },
            { meal: 'Dinner', food: 'Lean Beef Steak & Sweet Potato Wedges', qty: '180g Lean Beef (raw), 200g Sweet Potato', macros: 'P: 50g | C: 60g | F: 15g' },
        ],
        workoutPlans: [
            { name: 'Barbell Power Cleans', sets: '5 Sets x 3 Reps', notes: 'Focus on peak concentric velocity and explosive triple extension.' },
            { name: 'Trap Bar Deadlifts', sets: '4 Sets x 5 Reps', notes: 'Maximal axial force with minimized lower spinal shear stress.' },
            { name: 'Med Ball Rotational Throws', sets: '3 Sets x 8 / side', notes: 'Translational kinetic power through kinetic chains.' },
        ],
    },

    rehab: {
        id: 'rehab',
        title: 'Correctional Rehab Protocol',
        subtitle: 'Joint Decompression, Collagen Turnover & Mobility',
        icon: '🦴',
        badgeColor: 'var(--accent-green)',
        bgAccent: 'rgba(0, 255, 136, 0.1)',
        dailyTargets: {
            calories: 2150,
            protein: 150,
            carbs: 210,
            fat: 65,
        },
        nutritionRules: [
            { type: 'REQUIRE', text: 'Collagen Peptides + Vit C (Tendon and ligament synthesis)', color: 'var(--accent-green)' },
            { type: 'REQUIRE', text: 'Omega-3 EPA/DHA (> 3000mg for systemic inflammation)', color: 'var(--accent-cyan)' },
            { type: 'EXCLUDE', text: 'Refined Fructose & High Inflammatory AGE Foods', color: 'var(--accent-pink)' },
        ],
        exerciseRules: [
            { type: 'APPROVED', text: 'Isometric Holds (Tendon stiffness & pain analgesia)', color: 'var(--accent-green)' },
            { type: 'APPROVED', text: 'End-Range Joint Mobility (CARs - Controlled Articular Rotations)', color: 'var(--accent-cyan)' },
            { type: 'VETOED', text: 'Axial Spinal Compressive Loads under fatigue', color: 'var(--accent-pink)' },
        ],
        mealPlans: [
            { meal: 'Breakfast', food: 'Turmeric Poached Eggs & Sourdough', qty: '3 Eggs, 50g Sourdough, Turmeric + Black Pepper', macros: 'P: 22g | C: 28g | F: 16g' },
            { meal: 'Lunch', food: 'Wild Salmon, Quinoa & Grilled Asparagus', qty: '150g Salmon, 50g Quinoa (dry), 100g Asparagus', macros: 'P: 42g | C: 35g | F: 20g' },
            { meal: 'Dinner', food: 'Bone Broth Stew with Turkey & Greens', qty: '250ml Bone Broth, 150g Turkey Breast, Spinach', macros: 'P: 48g | C: 15g | F: 10g' },
        ],
        workoutPlans: [
            { name: 'Band Pull-Aparts & Face Pulls', sets: '4 Sets x 15 Reps', notes: 'Scapular retractor re-education and posterior cuff activation.' },
            { name: '90/90 Hip Mobility & PNF', sets: '3 Sets x 60 Secs', notes: 'Internal/external hip capsule decompression.' },
            { name: 'Goblet Squats with 3-sec Pause', sets: '3 Sets x 8 Reps', notes: 'Ankle dorsiflexion and deep hip socket loading.' },
        ],
    },

    combat: {
        id: 'combat',
        title: 'Combat Sports Protocol',
        subtitle: 'Weight Cutting, Gas Tank Endurance & Ballistic Power',
        icon: '🥊',
        badgeColor: '#ff4444',
        bgAccent: 'rgba(255, 0, 0, 0.1)',
        dailyTargets: {
            calories: 2500,
            protein: 180,
            carbs: 250,
            fat: 60,
        },
        nutritionRules: [
            { type: 'REQUIRE', text: 'High Sodium / Potassium Balance for Sweat Rate Retention', color: 'var(--accent-yellow)' },
            { type: 'PRIORITY', text: 'Fast Gastric Emptying Carbohydrates Around Sparring', color: 'var(--accent-cyan)' },
            { type: 'LIMIT', text: 'High Residue / Slow Fermentable Fibers near Weigh-ins', color: 'var(--accent-pink)' },
        ],
        exerciseRules: [
            { type: 'PRIORITY', text: 'Rotational Velocity & Core Stiffness Modules', color: '#ff4444' },
            { type: 'APPROVED', text: 'Lactate Threshold Intervals (Gas Tank Conditioning)', color: 'var(--accent-green)' },
            { type: 'APPROVED', text: 'Neck & Trapezius Hypertrophy (Concussion Mitigation)', color: 'var(--accent-cyan)' },
        ],
        mealPlans: [
            { meal: 'Fuel Window', food: 'Oatmeal, Banana & Whey with Himalayan Salt', qty: '60g Oats, 1 Banana, 1 Scoop Whey, 1g Salt', macros: 'P: 32g | C: 65g | F: 6g' },
            { meal: 'Post-Sparring', food: 'Lean Flank Steak, White Jasmine Rice & Pineapple', qty: '180g Steak, 120g Rice, 50g Pineapple (Bromelain)', macros: 'P: 50g | C: 75g | F: 12g' },
            { meal: 'Dinner', food: 'Steamed White Fish with Steamed Greens & Avocado', qty: '200g Cod/Tilapia, 150g Greens, 40g Avocado', macros: 'P: 45g | C: 12g | F: 10g' },
        ],
        workoutPlans: [
            { name: 'Shadowboxing with 1kg Dumbbells', sets: '5 Rounds x 3 Mins', notes: 'Punch endurance with scapular deceleration control.' },
            { name: 'Sled Push & Heavy Battle Ropes', sets: '6 Sets x 45 Secs On / 45 Off', notes: 'Anaerobic lactic buffer training without joint pounding.' },
            { name: '4-Way Neck Resistance & Anti-Rotation', sets: '3 Sets x 15 Reps', notes: 'Strengthen cervical spine to reduce brain acceleration.' },
        ],
    },
}

export function getProtocolData(trackId: TrackId): TrackProtocolData {
    return PROTOCOL_DATA[trackId] || PROTOCOL_DATA.athletic
}

export function getAllTracks(): Array<{ id: TrackId; title: string; subtitle: string; icon: string; badgeColor: string; bgAccent: string }> {
    return (Object.keys(TRACK_METADATA) as TrackId[]).map(id => ({
        id,
        ...TRACK_METADATA[id],
    }))
}

// Compute personalized daily targets
export function calculateTrackTargets(intake: IntakeDiagnostics, trackId: TrackId) {
    const base = PROTOCOL_DATA[trackId]?.dailyTargets || PROTOCOL_DATA.athletic.dailyTargets
    if (!intake.weightKg) return base

    const weight = intake.weightKg
    let protein = Math.round(weight * 2.0)
    let calories = base.calories

    if (intake.sex === 'Female') {
        protein = Math.round(weight * 1.8)
    }

    if (trackId === 'clinical') {
        calories = Math.round(weight * 26)
    } else if (trackId === 'athletic' || trackId === 'combat') {
        calories = Math.round(weight * 34)
    } else if (trackId === 'maternal') {
        calories = Math.round(weight * 30 + 300)
    }

    const fat = Math.round((calories * 0.25) / 9)
    const carbs = Math.round((calories - (protein * 4 + fat * 9)) / 4)

    return {
        calories,
        protein,
        carbs,
        fat,
    }
}
