window.NutReBirthComponents = window.NutReBirthComponents || {};

window.NutReBirthComponents.logistics = `
<!-- 8. GROCERY LOGISTICS & MEAL PREP -->
<div id="view-logistics" class="view">
    <div class="header"><h1>Food Fulfillment</h1></div>
    <div class="content">
        <p style="font-size:12px; color:var(--text-muted);">Your weekly nutrition program has been converted into exact grocery logistics.</p>

        <div class="section-title">Automated Grocery List (Weekly)</div>
        <div class="card">
            <ul style="list-style:none; padding:0; margin:0; font-size:13px; font-weight:500;">
                <li style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #222; padding-bottom:10px;"><span>Chicken Breast (Raw)</span><span style="color:var(--accent-cyan);">2.5 kg</span></li>
                <li style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #222; padding-bottom:10px;"><span>Spinach & Greens</span><span style="color:var(--accent-cyan);">800 g</span></li>
                <li style="display:flex; justify-content:space-between;"><span>Rolled Oats</span><span style="color:var(--accent-cyan);">1.2 kg</span></li>
            </ul>
        </div>
        
        <div class="grid-2" style="margin-bottom: 20px;">
            <button class="btn-primary" style="background:#541554; box-shadow:none; font-size:12px;" onclick="alert('Sending list API payload to Zepto...')">Send to Zepto</button>
            <button class="btn-primary" style="background:#F6D140; color:#000; box-shadow:none; font-size:12px;" onclick="alert('Sending list API payload to Blinkit...')">Send to Blinkit</button>
        </div>

        <div class="section-title">Meal Prep Integration</div>
        <div class="card" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
                <div style="font-weight:700; font-size:14px;">Nutri-Kitchen Partners</div>
                <div style="font-size:11px; color:var(--text-muted);">Want it cooked? We route macros directly to partnered kitchens.</div>
            </div>
            <button class="btn-primary btn-secondary" style="width:auto; padding:10px 15px; font-size:12px; margin:0;" onclick="alert('Nutri-Kitchen partners available in your PIN code.')">Explore</button>
        </div>
    </div>
</div>
`;
