window.NutReBirthComponents = window.NutReBirthComponents || {};

window.NutReBirthComponents.login = `
<!-- 1. LOGIN -->
<div id="view-login" class="view active">
    <div class="content" style="display:flex; flex-direction:column; justify-content:center; height:100%; padding-top:40px;">
        <div style="text-align:center; margin-bottom: 40px;">
            <h1 style="font-size: 32px; font-weight: 900; background: linear-gradient(90deg, #fff, var(--accent-cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">NutReBirth</h1>
            <p style="color:var(--text-muted); font-size: 13px;">The Ultimate Health Ecosystem</p>
        </div>
        
        <div class="input-group">
            <span class="input-label">Mobile Number</span>
            <input type="tel" class="styled-input" placeholder="+91 98765 43210" value="+91 ">
        </div>
        <button class="btn-primary" onclick="navTo('view-questionnaire')">Login via OTP</button>
    </div>
</div>
`;
