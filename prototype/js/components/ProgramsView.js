window.NutReBirthComponents = window.NutReBirthComponents || {};

window.NutReBirthComponents.programs = `
<!-- 3. PROGRAM SELECTION (5 Tracks) -->
<div id="view-programs" class="view">
    <div class="header"><h1>Select Program</h1></div>
    <div class="content">
        <p style="font-size: 13px; color: var(--text-muted);">Based on your intake, choose your primary trajectory.</p>

        <div class="program-card" onclick="selectProgram('maternal')">
            <div class="program-icon" style="background: rgba(255, 64, 129, 0.1); color: var(--accent-pink);">👶</div>
            <div class="program-info">
                <h3>Pre & Post-Natal</h3>
                <p>Pregnancy safety, folate focus, pelvic floor.</p>
            </div>
        </div>

        <div class="program-card" onclick="selectProgram('clinical')">
            <div class="program-icon" style="background: rgba(255, 193, 7, 0.1); color: var(--accent-yellow);">🩺</div>
            <div class="program-info">
                <h3>Chronic Disease Reversal</h3>
                <p>Diabetes, PCOS, glycemic & endocrine control.</p>
            </div>
        </div>

        <div class="program-card" onclick="selectProgram('athletic')">
            <div class="program-icon" style="background: rgba(0, 212, 255, 0.1); color: var(--accent-cyan);">⚡</div>
            <div class="program-info">
                <h3>Athletic Performance</h3>
                <p>Macro-cycling, power output, CNS tracking.</p>
            </div>
        </div>

        <div class="program-card" onclick="selectProgram('rehab')">
            <div class="program-icon" style="background: rgba(0, 255, 136, 0.1); color: var(--accent-green);">🦴</div>
            <div class="program-info">
                <h3>Injury Prevention & Rehab</h3>
                <p>Correctional exercise, joint health, mobility.</p>
            </div>
        </div>

        <div class="program-card" onclick="selectProgram('combat')">
            <div class="program-icon" style="background: rgba(255, 0, 0, 0.1); color: #ff4444;">🥊</div>
            <div class="program-info">
                <h3>Combat Sport Specific</h3>
                <p>Weight cutting, ballistic power, gas tank prep.</p>
            </div>
        </div>
    </div>
</div>
`;
