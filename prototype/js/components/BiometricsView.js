window.NutReBirthComponents = window.NutReBirthComponents || {};

window.NutReBirthComponents.biometrics = `
<!-- 7. BIOMETRICS & BLOODWORK -->
<div id="view-biometrics" class="view">
    <div class="header"><h1>Biometrics & Labs</h1></div>
    <div class="content">
        <div class="grid-2" style="margin-bottom: 15px;">
            <div class="card" style="margin:0; text-align:center;">
                <div style="font-size:24px; margin-bottom:5px;">💧</div>
                <div style="font-size:18px; font-weight:800;">2.4L</div>
                <div style="font-size:10px; color:var(--text-muted);">Hydration</div>
            </div>
            <div class="card" style="margin:0; text-align:center;">
                <div style="font-size:24px; margin-bottom:5px;">👣</div>
                <div style="font-size:18px; font-weight:800;">8,432</div>
                <div style="font-size:10px; color:var(--text-muted);">Steps</div>
            </div>
        </div>

        <div class="section-title">Body Composition</div>
        <div class="card">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:13px; font-weight:600;"><span>BMI</span> <span style="color:var(--accent-green);">22.4 (Normal)</span></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:13px; font-weight:600;"><span>Body Fat %</span> <span>16.5%</span></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:13px; font-weight:600;"><span>Muscle Mass</span> <span>34.2 kg</span></div>
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600;"><span>Visceral Fat</span> <span style="color:var(--accent-green);">Level 4</span></div>
        </div>

        <div class="section-title">Blood Reports (PDF Parser)</div>
        <div class="card" style="border-color: var(--accent-yellow); background: rgba(255, 193, 7, 0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span style="font-weight:700; font-size:14px; color:var(--accent-yellow);">🔔 3-Month Alert</span>
                <span style="font-size:10px; background:#332200; padding:4px 8px; border-radius:4px;">Due Now</span>
            </div>
            <p style="font-size:12px; color:var(--text-muted); margin-bottom:15px;">It has been 90 days since your last lipid/HbA1c panel. Please upload a new report.</p>
            
            <div style="border: 2px dashed #444; border-radius: 12px; padding: 20px; text-align: center; cursor:pointer;" onclick="alert('Uploads PDF. Backend runs OCR to extract HbA1c, Lipids, etc., into database.')">
                <div style="font-size:24px; margin-bottom:5px;">📄</div>
                <div style="font-size:12px; font-weight:700;">Tap to Upload Lab PDF</div>
            </div>
        </div>
        <button class="btn-primary btn-secondary" onclick="alert('Phlebotomist scheduled for home collection!')">Book Blood Test (Phlebotomist)</button>
    </div>
</div>
`;
