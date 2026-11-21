window.NutReBirthComponents = window.NutReBirthComponents || {};

window.NutReBirthComponents.medical = `
<!-- 4. MEDICAL CLEARANCE (Conditional) -->
<div id="view-medical" class="view">
    <div class="header"><h1>Medical Clearance</h1></div>
    <div class="content" style="text-align: center;">
        <div style="font-size: 60px; margin: 20px 0;">🏥</div>
        <h2 style="margin-bottom: 10px;">Expert Consultation Required</h2>
        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 30px;">
            Because you selected a Clinical or Maternal track, NutReBirth protocols require a brief clearance call with our certified endocrinologist or OB-GYN specialist before generating your nutrition plan.
        </p>
        <div class="card" style="text-align: left;">
            <div style="font-weight: 700; margin-bottom: 10px;">Available Today</div>
            <div style="display: flex; gap: 10px;">
                <div class="select-card" style="flex:1;">1:30 PM</div>
                <div class="select-card" style="flex:1;">3:00 PM</div>
                <div class="select-card" style="flex:1;">4:15 PM</div>
            </div>
        </div>
        <button class="btn-primary" onclick="navTo('view-coach')">Book Medical Consult &rarr;</button>
    </div>
</div>
`;
