window.NutReBirthComponents = window.NutReBirthComponents || {};

window.NutReBirthComponents.portal = `
<!-- 10. APPOINTMENT PORTAL (General) -->
<div id="view-portal" class="view">
    <div class="header"><h1>Booking Portal</h1></div>
    <div class="content">
        <div class="section-title" style="margin-top: 0;">Expert Consultations</div>
        <div class="card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="alert('Coach check-in booked for Friday, 4:00 PM.')">
            <div><h3 style="margin:0;">Coach Check-in</h3><p style="margin:0; font-size:11px; color:var(--text-muted);">Bi-weekly progress review.</p></div>
            <div>📅</div>
        </div>
        <div class="card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="alert('Physiotherapist appointment booked.')">
            <div><h3 style="margin:0;">Physiotherapist</h3><p style="margin:0; font-size:11px; color:var(--text-muted);">Injury & mobility consultation.</p></div>
            <div>🦴</div>
        </div>
        <div class="card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="alert('Phlebotomist scheduled for home collection.')">
            <div><h3 style="margin:0;">Phlebotomist (Blood)</h3><p style="margin:0; font-size:11px; color:var(--text-muted);">Home collection booking.</p></div>
            <div>🩸</div>
        </div>

        <div class="section-title">Account & Settings</div>
        <div class="card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="navTo('view-plans')">
            <div><h3 style="margin:0;">Plans & Subscriptions</h3><p style="margin:0; font-size:11px; color:var(--text-muted);">Manage your membership tier.</p></div>
            <div>💳</div>
        </div>
        <div class="card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="navTo('view-support')">
            <div><h3 style="margin:0;">Help & Support</h3><p style="margin:0; font-size:11px; color:var(--text-muted);">FAQs, tutorials, and customer service.</p></div>
            <div>❓</div>
        </div>
    </div>
</div>
`;
