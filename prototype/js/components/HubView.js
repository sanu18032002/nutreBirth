window.NutReBirthComponents = window.NutReBirthComponents || {};

window.NutReBirthComponents.hub = `
<!-- 6. PROGRAM DELIVERY (THE CORE ENGINE) -->
<div id="view-hub" class="view">
    <div class="header">
        <div>
            <h1 style="font-size: 20px;">NutReBirth Hub</h1>
            <span id="hub-track-title" style="font-size: 10px; color: var(--accent-cyan); text-transform:uppercase; font-weight:700;">Program</span>
        </div>
    </div>
    <div class="content">
        <div class="db-badge">Integrations: Master_Nutrition.xlsx & Exercise_DB.xlsx</div>
        
        <div class="card" style="background: linear-gradient(135deg, #111827, #0a1128); border-color: var(--accent-cyan);">
            <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:15px;">
                <div>
                    <div style="font-size:10px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Daily Targets</div>
                    <div style="font-size:24px; font-weight:900; color:var(--accent-cyan);">2,450 <span style="font-size:12px; color:#888;">Kcal</span></div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:12px; font-weight:700;">P: 160g</div>
                    <div style="font-size:12px; font-weight:700;">C: 220g</div>
                    <div style="font-size:12px; font-weight:700;">F: 70g</div>
                </div>
            </div>
        </div>

        <div class="section-title">Today's Nutrition Plan</div>
        <div id="engine-meal-plan" style="margin-bottom: 20px;"></div>

        <div class="section-title">Today's Workout Plan</div>
        <div id="engine-workout-plan" style="margin-bottom: 20px;"></div>

        <div class="section-title">Applied AI Rules (The "Why")</div>
        <div class="card" id="engine-diet-results" style="font-size: 13px; line-height: 1.5; margin-bottom: 10px;"></div>
        <div class="card" id="engine-exercise-results" style="font-size: 13px; line-height: 1.5;"></div>
    </div>
</div>
`;
