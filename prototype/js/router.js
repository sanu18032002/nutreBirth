// State
let activeProgram = "athletic";

// Navigation Logic
function navTo(viewId, navElement = null) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
    }

    // Bottom Nav Visibility
    const inAppScreens = ['view-hub', 'view-biometrics', 'view-logistics', 'view-portal', 'view-chat', 'view-plans', 'view-support'];
    const nav = document.getElementById('main-nav');
    if (nav) {
        if (inAppScreens.includes(viewId)) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
    }

    // Update Active Nav Style
    if (navElement) {
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        navElement.classList.add('active');
    }
}

// Sequential Flow Logic
function selectProgram(trackId) {
    activeProgram = trackId;
    
    // Medical Clearance Gate
    if (trackId === 'clinical' || trackId === 'maternal') {
        navTo('view-medical');
    } else {
        navTo('view-coach');
    }
}

function finalizeSetup() {
    generateProgramLogic(activeProgram);
    
    const titles = {
        'clinical': 'Chronic Disease Protocol',
        'maternal': 'Pre/Post-Natal Protocol',
        'athletic': 'Peak Athlete Protocol',
        'rehab': 'Correctional Rehab Protocol',
        'combat': 'Combat Sports Protocol'
    };
    const titleEl = document.getElementById('hub-track-title');
    if (titleEl) {
        titleEl.innerText = titles[activeProgram] || 'Program';
    }
    
    navTo('view-hub', document.querySelectorAll('.nav-item')[0]);
}
