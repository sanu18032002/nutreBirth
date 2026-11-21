window.NutReBirthComponents = window.NutReBirthComponents || {};

window.NutReBirthComponents.plans = `
<!-- 11. PLANS & SUBSCRIPTIONS -->
<div id="view-plans" class="view">
    <div class="header">
        <div class="header-left">
            <div class="back-btn" onclick="navTo('view-portal')">&larr;</div>
            <h1>Subscriptions</h1>
        </div>
    </div>
    <div class="content">
        <!-- Pricing Toggle -->
        <div class="grid-2" style="margin-bottom: 20px;">
            <div class="select-card active" onclick="this.parentElement.children[1].classList.remove('active'); this.classList.add('active');">Monthly</div>
            <div class="select-card" onclick="this.parentElement.children[0].classList.remove('active'); this.classList.add('active');">Annually (-20%)</div>
        </div>
        
        <!-- Plan 1 -->
        <div class="card" style="border-color: var(--border-color);">
            <h3 style="margin:0 0 5px 0;">NutReBirth Essential</h3>
            <div style="font-size:28px; font-weight:900; color:#fff; margin-bottom:15px;">₹1,999<span style="font-size:12px; font-weight:500; color:var(--text-muted);"> /mo</span></div>
            <ul style="font-size:12px; color:var(--text-muted); line-height:1.8; padding-left:15px; margin:0 0 20px 0;">
                <li>AI Diet & Exercise Data Engines</li>
                <li>Automated Grocery List Generation</li>
                <li>Basic Biometrics & Wearable Sync</li>
                <li>Standard Community Support</li>
            </ul>
            <button class="btn-primary btn-secondary" style="padding:12px; margin:0;">Current Plan</button>
        </div>
        
        <!-- Plan 2 -->
        <div class="card" style="border-color: var(--accent-cyan); background: linear-gradient(145deg, #111827, #0a1128);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                <h3 style="margin:0;">NutReBirth Elite</h3>
                <span style="background:var(--accent-cyan); color:#000; font-size:9px; font-weight:800; padding:3px 8px; border-radius:12px; text-transform:uppercase;">Most Popular</span>
            </div>
            <div style="font-size:28px; font-weight:900; color:var(--accent-cyan); margin-bottom:15px;">₹4,999<span style="font-size:12px; font-weight:500; color:var(--text-muted);"> /mo</span></div>
            <ul style="font-size:12px; color:var(--text-muted); line-height:1.8; padding-left:15px; margin:0 0 20px 0;">
                <li style="color:#fff;"><strong>Everything in Essential, plus:</strong></li>
                <li>Dedicated 1-on-1 Human Coach</li>
                <li>Medical/Endocrinologist Consultations</li>
                <li>AI Form Correction Camera Access</li>
                <li>Cloud Kitchen Direct Logistics</li>
            </ul>
            <button class="btn-primary" style="padding:12px; margin:0; box-shadow: 0 4px 15px rgba(0, 212, 255, 0.2);" onclick="alert('Upgraded to NutReBirth Elite 🎉')">Upgrade to Elite</button>
        </div>
    </div>
</div>
`;
