// ==========================================
// DATA ENGINE: Simulating the Excel Integration
// ==========================================
const NutReBirthDataEngine = {
    nutritionRules: {
        clinical: [
            { type: 'EXCLUDE', text: 'High Glycemic Foods (ICMR/FDA Ref: Glucose Spike)', color: 'var(--accent-pink)' },
            { type: 'REQUIRE', text: 'High Fiber > 35g/day (Insulin Sensitivity)', color: 'var(--accent-cyan)' }
        ],
        maternal: [
            { type: 'EXCLUDE', text: 'Raw Seafood / High Mercury (FDA Ref)', color: 'var(--accent-pink)' },
            { type: 'REQUIRE', text: 'High Folate & Calcium Density', color: 'var(--accent-green)' }
        ],
        athletic: [
            { type: 'REQUIRE', text: 'Targeted Carbohydrate Cycling (Pre/Intra)', color: 'var(--accent-blue)' },
            { type: 'LIMIT', text: 'Fat intake near training windows', color: 'var(--accent-yellow)' }
        ],
        rehab: [
            { type: 'REQUIRE', text: 'Collagen Peptides + Vit C (Tendon Synthesis)', color: 'var(--accent-green)' },
            { type: 'REQUIRE', text: 'Omega-3 EPA/DHA (> 3000mg Anti-inflammatory)', color: 'var(--accent-cyan)' }
        ],
        combat: [
            { type: 'REQUIRE', text: 'High Sodium/Potassium Balance (Sweat Retention)', color: 'var(--accent-yellow)' },
            { type: 'PRIORITY', text: 'Fast Gastric Emptying Carbs Around Sparring', color: 'var(--accent-cyan)' }
        ]
    },
    exerciseRules: {
        clinical: [
            { type: 'APPROVED', text: 'Zone 2 LISS (Mitochondrial function)', color: 'var(--accent-green)' },
            { type: 'VETOED', text: 'Extreme HIIT (Cortisol/Insulin disruption)', color: 'var(--accent-pink)' }
        ],
        maternal: [
            { type: 'APPROVED', text: 'Seated / Supported Compound Lifts', color: 'var(--accent-green)' },
            { type: 'VETOED', text: 'Supine (Back-laying) exercises after T1', color: 'var(--accent-pink)' },
            { type: 'VETOED', text: 'Heavy Valsalva Maneuver (Core Brace)', color: 'var(--accent-pink)' }
        ],
        athletic: [
            { type: 'PRIORITY', text: 'Ballistic / Plyometric Power Modules', color: 'var(--accent-cyan)' },
            { type: 'MODIFIED', text: 'Auto-regulated Volume based on CNS HRV', color: 'var(--accent-yellow)' }
        ],
        rehab: [
            { type: 'APPROVED', text: 'Isometric Holds (Tendon analgesia & stiffness)', color: 'var(--accent-green)' },
            { type: 'VETOED', text: 'Axial Compressive Loads Under Fatigue', color: 'var(--accent-pink)' }
        ],
        combat: [
            { type: 'PRIORITY', text: 'Rotational Velocity & Core Stiffness Modules', color: '#ff4444' },
            { type: 'APPROVED', text: 'Lactate Threshold Intervals (Gas Tank Conditioning)', color: 'var(--accent-green)' }
        ]
    },
    mealPlans: {
        clinical: [
            { meal: "Breakfast", food: "Moong Dal Chilla with Mint Chutney", qty: "60g Moong Dal (raw/dry weight), 30g Chutney", macros: "P: 22g | C: 35g (Low GI) | F: 8g" },
            { meal: "Lunch", food: "Grilled Chicken & Quinoa Salad", qty: "150g Chicken (raw), 50g Quinoa (dry), 10ml Olive Oil", macros: "P: 45g | C: 40g | F: 15g" },
            { meal: "Dinner", food: "Baked Salmon with Steamed Broccoli", qty: "120g Salmon (raw), 150g Broccoli", macros: "P: 40g | C: 15g | F: 22g" }
        ],
        maternal: [
            { meal: "Breakfast", food: "Spinach & Feta Omelette (Folate/Calcium)", qty: "3 Whole Eggs, 50g Spinach, 30g Feta Cheese", macros: "P: 25g | C: 10g | F: 18g" },
            { meal: "Lunch", food: "Lentil Soup & Roasted Sweet Potato (Iron)", qty: "200ml Lentil Soup (thick), 150g Sweet Potato (raw)", macros: "P: 20g | C: 55g | F: 12g" },
            { meal: "Dinner", food: "Pasteurized Greek Yogurt Parfait", qty: "200g Greek Yogurt, 50g Mixed Berries", macros: "P: 20g | C: 30g | F: 5g" }
        ],
        athletic: [
            { meal: "Pre-Workout", food: "Rice Cakes, Honey & Whey Isolate", qty: "3x Rice Cakes, 15g Honey, 1 Scoop (30g) Whey", macros: "P: 30g | C: 50g | F: 2g" },
            { meal: "Post-Workout", food: "Chicken Breast & Jasmine White Rice", qty: "200g Chicken (raw), 100g Rice (dry)", macros: "P: 55g | C: 80g | F: 5g" },
            { meal: "Dinner", food: "Lean Beef Steak & Sweet Potato Wedges", qty: "180g Lean Beef (raw), 200g Sweet Potato", macros: "P: 50g | C: 60g | F: 15g" }
        ],
        rehab: [
            { meal: "Breakfast", food: "Turmeric Poached Eggs & Sourdough", qty: "3 Eggs, 50g Sourdough, Turmeric + Black Pepper", macros: "P: 22g | C: 28g | F: 16g" },
            { meal: "Lunch", food: "Wild Salmon, Quinoa & Grilled Asparagus", qty: "150g Salmon, 50g Quinoa (dry), 100g Asparagus", macros: "P: 42g | C: 35g | F: 20g" },
            { meal: "Dinner", food: "Bone Broth Stew with Turkey & Greens", qty: "250ml Bone Broth, 150g Turkey Breast, Spinach", macros: "P: 48g | C: 15g | F: 10g" }
        ],
        combat: [
            { meal: "Fuel Window", food: "Oatmeal, Banana & Whey with Himalayan Salt", qty: "60g Oats, 1 Banana, 1 Scoop Whey, 1g Salt", macros: "P: 32g | C: 65g | F: 6g" },
            { meal: "Post-Sparring", food: "Lean Flank Steak, White Jasmine Rice & Pineapple", qty: "180g Steak, 120g Rice, 50g Pineapple", macros: "P: 50g | C: 75g | F: 12g" },
            { meal: "Dinner", food: "Steamed White Fish with Steamed Greens & Avocado", qty: "200g Cod, 150g Greens, 40g Avocado", macros: "P: 45g | C: 12g | F: 10g" }
        ]
    },
    workoutPlans: {
        clinical: [
            { name: "Post-Meal Brisk Walk", sets: "15 Mins", notes: "Glucose clearing mechanism." },
            { name: "Resistance Band Squats", sets: "3 Sets x 12 Reps", notes: "Build muscle insulin sensitivity." },
            { name: "Incline Planks", sets: "3 Sets x 30 Secs", notes: "Core stability without high pressure." }
        ],
        maternal: [
            { name: "Seated Cable Rows", sets: "3 Sets x 12 Reps", notes: "Strengthens posture for belly load." },
            { name: "Bird-Dog Extensions", sets: "3 Sets x 10/side", notes: "Safe core stability." },
            { name: "Incline Push-ups", sets: "3 Sets x 10 Reps", notes: "Alleviates intra-abdominal pressure." }
        ],
        athletic: [
            { name: "Barbell Power Cleans", sets: "5 Sets x 3 Reps", notes: "Focus on peak concentric velocity." },
            { name: "Trap Bar Deadlifts", sets: "4 Sets x 5 Reps", notes: "Heavy load, minimize spinal shear." },
            { name: "Med Ball Rotational Throws", sets: "3 Sets x 8/side", notes: "Translational punching power." }
        ],
        rehab: [
            { name: "Band Pull-Aparts & Face Pulls", sets: "4 Sets x 15 Reps", notes: "Scapular retractor re-education." },
            { name: "90/90 Hip Mobility & PNF", sets: "3 Sets x 60 Secs", notes: "Internal/external hip capsule decompression." },
            { name: "Goblet Squats with 3-sec Pause", sets: "3 Sets x 8 Reps", notes: "Ankle dorsiflexion and deep hip loading." }
        ],
        combat: [
            { name: "Shadowboxing with 1kg Dumbbells", sets: "5 Rounds x 3 Mins", notes: "Punch endurance with scapular control." },
            { name: "Sled Push & Heavy Battle Ropes", sets: "6 Sets x 45s On / 45s Off", notes: "Anaerobic lactic buffer training." },
            { name: "4-Way Neck Resistance", sets: "3 Sets x 15 Reps", notes: "Cervical spine concussion mitigation." }
        ]
    }
};

function generateProgramLogic(track) {
    const validTracks = ['clinical', 'maternal', 'athletic', 'rehab', 'combat'];
    const mappedTrack = validTracks.includes(track) ? track : 'athletic';
    
    const nRules = NutReBirthDataEngine.nutritionRules[mappedTrack];
    const eRules = NutReBirthDataEngine.exerciseRules[mappedTrack];
    const meals = NutReBirthDataEngine.mealPlans[mappedTrack];
    const workouts = NutReBirthDataEngine.workoutPlans[mappedTrack];

    // Render Meals
    let mealsHtml = '';
    meals.forEach(m => {
        mealsHtml += `
        <div class="card" style="padding: 12px; margin-bottom: 8px;">
            <div style="font-size: 10px; color: var(--accent-cyan); font-weight: 800; text-transform: uppercase;">${m.meal}</div>
            <div style="font-size: 14px; font-weight: 700; margin: 4px 0;">${m.food}</div>
            <div style="font-size: 11px; color: var(--accent-green); font-weight: 600; margin-bottom: 6px;">⚖️ ${m.qty}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${m.macros}</div>
        </div>`;
    });
    const mealPlanEl = document.getElementById('engine-meal-plan');
    if (mealPlanEl) mealPlanEl.innerHTML = mealsHtml;

    // Render Workouts
    let workoutsHtml = '';
    workouts.forEach(w => {
        workoutsHtml += `
        <div class="card" style="padding: 12px; margin-bottom: 8px; border-left: 3px solid var(--accent-green);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="font-size: 14px; font-weight: 700;">${w.name}</div>
                <div style="font-size: 11px; background: rgba(0, 255, 136, 0.1); color: var(--accent-green); padding: 2px 6px; border-radius: 4px; font-weight: 700;">${w.sets}</div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${w.notes}</div>
        </div>`;
    });
    const workoutPlanEl = document.getElementById('engine-workout-plan');
    if (workoutPlanEl) workoutPlanEl.innerHTML = workoutsHtml;

    // Render Rules
    let nHtml = '';
    nRules.forEach(item => {
        nHtml += `<div style="display:flex; gap:10px; margin-bottom:10px; padding-bottom:10px; border-bottom:1px solid #222;">
                    <span style="font-size:9px; font-weight:800; padding:2px 6px; border-radius:4px; border:1px solid ${item.color}; color:${item.color}; height:fit-content;">${item.type}</span>
                    <span>${item.text}</span>
                  </div>`;
    });
    const dietResultsEl = document.getElementById('engine-diet-results');
    if (dietResultsEl) dietResultsEl.innerHTML = nHtml;

    let eHtml = '';
    eRules.forEach(item => {
        eHtml += `<div style="display:flex; gap:10px; margin-bottom:10px; padding-bottom:10px; border-bottom:1px solid #222;">
                    <span style="font-size:9px; font-weight:800; padding:2px 6px; border-radius:4px; border:1px solid ${item.color}; color:${item.color}; height:fit-content;">${item.type}</span>
                    <span>${item.text}</span>
                  </div>`;
    });
    const exerciseResultsEl = document.getElementById('engine-exercise-results');
    if (exerciseResultsEl) exerciseResultsEl.innerHTML = eHtml;
}
