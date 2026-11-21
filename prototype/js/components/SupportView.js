window.NutReBirthComponents = window.NutReBirthComponents || {};

window.NutReBirthComponents.support = `
<!-- 12. HELP & SUPPORT -->
<div id="view-support" class="view">
    <div class="header">
        <div class="header-left">
            <div class="back-btn" onclick="navTo('view-portal')">&larr;</div>
            <h1>Help & Support</h1>
        </div>
    </div>
    <div class="content">
        <div class="input-group">
            <input type="text" class="styled-input" placeholder="Search for help... (e.g., Apple Watch)">
        </div>

        <div class="section-title">Quick Actions</div>
        <div class="card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="alert('Connecting to Live Agent...')">
            <div><h3 style="margin:0;">Live Chat Support</h3><p style="margin:0; font-size:11px; color:var(--text-muted);">Avg wait time: ~2 mins.</p></div>
            <div style="font-size:20px;">💬</div>
        </div>
        <div class="card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="alert('Opening video tutorials feed.')">
            <div><h3 style="margin:0;">Video Tutorials</h3><p style="margin:0; font-size:11px; color:var(--text-muted);">Master the NutReBirth ecosystem.</p></div>
            <div style="font-size:20px;">📺</div>
        </div>

        <div class="section-title">Frequently Asked Questions</div>
        <div class="card" style="margin-bottom:10px;">
            <div style="font-size:13px; font-weight:700; margin-bottom:5px;">How do I sync my smart watch?</div>
            <div style="font-size:11px; color:var(--text-muted); line-height:1.5;">Navigate to the Biometrics tab, click the 'Live Sync' status indicator, and authenticate with Apple Health or Google Fit to automatically import your steps, HRV, and sleep.</div>
        </div>
        <div class="card" style="margin-bottom:10px;">
            <div style="font-size:13px; font-weight:700; margin-bottom:5px;">Can I switch my medical track?</div>
            <div style="font-size:11px; color:var(--text-muted); line-height:1.5;">Yes. If your goal changes (e.g., from Athletic to Prenatal), reach out to your coach or retake the Triage Diagnostic to safely recalibrate your diet and exercise engines.</div>
        </div>
        <div class="card" style="margin-bottom:10px;">
            <div style="font-size:13px; font-weight:700; margin-bottom:5px;">How does the grocery logistics work?</div>
            <div style="font-size:11px; color:var(--text-muted); line-height:1.5;">The engine calculates your exact weekly macros, converts them to physical food quantities, and generates an automated cart link for Blinkit or Zepto.</div>
        </div>
    </div>
</div>
`;
