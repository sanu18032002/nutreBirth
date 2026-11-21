window.NutReBirthComponents = window.NutReBirthComponents || {};

window.NutReBirthComponents.chat = `
<!-- 9. CHAT & ACCOUNTABILITY -->
<div id="view-chat" class="view" style="padding-bottom:150px;">
    <div class="header">
        <div class="header-left">
            <div style="width: 30px; height: 30px; border-radius: 50%; background: #111827; border: 1px solid var(--accent-cyan); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; color: var(--accent-cyan);">CA</div>
            <h1>Coach Arjun</h1>
        </div>
        <div style="font-size:20px; cursor:pointer;" onclick="alert('Initiating Video Call via Daily.co/Twilio')">📹</div>
    </div>
    <div class="content" id="chat-box">
        <div style="text-align:center; font-size:10px; color:#555; margin-bottom:20px;">Today, 8:00 AM</div>
        
        <div class="chat-bubble chat-ai">
            Good morning! Don't forget your hydration goal today. Based on yesterday's workout, your CNS might be a bit fatigued. Let's aim for Zone 2 cardio today.
        </div>
        
        <div class="chat-bubble chat-user">
            Got it. Just had my breakfast. 3 whole eggs, 2 slices of sourdough toast.
        </div>

        <div class="chat-bubble chat-ai" style="border-color:var(--accent-cyan);">
            <div style="font-size:10px; color:var(--accent-cyan); font-weight:700; margin-bottom:4px;">🤖 AI MACRO CALCULATION</div>
            Logged: ~420 kcal (P: 24g, C: 30g, F: 18g). Your coach has been updated.
        </div>
    </div>

    <!-- Voice/Text Input -->
    <div class="chat-input-area">
        <input type="text" class="styled-input" style="margin:0; padding:12px; flex:1;" placeholder="Type or use voice...">
        <button class="mic-btn" onclick="alert('NLP Voice-to-Text activated. Speak your meal/update.')">🎙️</button>
    </div>
</div>
`;
