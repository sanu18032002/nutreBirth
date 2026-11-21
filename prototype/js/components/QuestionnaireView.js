window.NutReBirthComponents = window.NutReBirthComponents || {};

window.NutReBirthComponents.questionnaire = `
<!-- 2. DEEP QUESTIONNAIRE -->
<div id="view-questionnaire" class="view">
    <div class="header"><h1>Intake Diagnostics</h1></div>
    <div class="content">
        <p style="font-size: 13px; color: var(--text-muted); line-height:1.5; margin-bottom: 25px;">To calibrate the NutReBirth engines perfectly, we need your comprehensive baseline metrics.</p>
        
        <div class="section-title" style="margin-top: 0;">Core Biometrics</div>
        <div class="grid-2">
            <div class="input-group">
                <span class="input-label">Age</span>
                <input type="number" class="styled-input" placeholder="e.g. 28">
            </div>
            <div class="input-group">
                <span class="input-label">Biological Sex</span>
                <select class="styled-select">
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
        </div>
        <div class="grid-2">
            <div class="input-group">
                <span class="input-label">Weight (kg)</span>
                <input type="number" class="styled-input" placeholder="e.g. 75">
            </div>
            <div class="input-group">
                <span class="input-label">Height (cm)</span>
                <input type="number" class="styled-input" placeholder="e.g. 175">
            </div>
        </div>

        <div class="section-title">Lifestyle & Metabolism</div>
        <div class="input-group">
            <span class="input-label">Daily Activity Level</span>
            <select class="styled-select">
                <option>Sedentary (Desk Job)</option>
                <option>Lightly Active (Some walking)</option>
                <option>Moderately Active (Workout 3-4x/wk)</option>
                <option>Highly Active (Athlete / Physical Job)</option>
            </select>
        </div>
        <div class="input-group">
            <span class="input-label">Dietary Preference</span>
            <select class="styled-select" id="q-diet">
                <option value="omnivore">Omnivore / Standard</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="keto">Keto</option>
            </select>
        </div>

        <div class="section-title">Sleep & Psychological State</div>
        <div class="grid-2">
            <div class="input-group">
                <span class="input-label">Avg. Sleep</span>
                <select class="styled-select">
                    <option>7-9 Hours (Optimal)</option>
                    <option>5-7 Hours</option>
                    <option>&lt; 5 Hours (Deprived)</option>
                </select>
            </div>
            <div class="input-group">
                <span class="input-label">Stress / Mood</span>
                <select class="styled-select">
                    <option>Low / Manageable</option>
                    <option>High / Anxious</option>
                    <option>Fatigue / Depressive</option>
                </select>
            </div>
        </div>

        <div class="section-title">Physical Readiness</div>
        <div class="input-group">
            <span class="input-label">Joint Pain / Limitations</span>
            <div class="grid-2">
                <div class="select-card" onclick="this.classList.toggle('active')">None / Healthy</div>
                <div class="select-card" onclick="this.classList.toggle('active')">Lower Back</div>
                <div class="select-card" onclick="this.classList.toggle('active')">Knees / Hips</div>
                <div class="select-card" onclick="this.classList.toggle('active')">Shoulders</div>
            </div>
        </div>

        <div class="section-title">Data Integration</div>
        <div class="input-group">
            <span class="input-label">Connect Wearable</span>
            <div class="grid-2">
                <div class="select-card" onclick="this.classList.toggle('active')">⌚ Apple Watch</div>
                <div class="select-card" onclick="this.classList.toggle('active')">🟢 Fitbit / Garmin</div>
            </div>
        </div>

        <button class="btn-primary" style="margin-top: 20px;" onclick="navTo('view-programs')">Analyze Profile &rarr;</button>
    </div>
</div>
`;
