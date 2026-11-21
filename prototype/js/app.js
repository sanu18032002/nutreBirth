window.NutReBirthComponents = window.NutReBirthComponents || {};

document.addEventListener('DOMContentLoaded', () => {
    const frame = document.querySelector('.mobile-frame');
    if (!frame) return;

    const views = [
        'login',
        'questionnaire',
        'programs',
        'medical',
        'coach',
        'hub',
        'biometrics',
        'logistics',
        'chat',
        'portal',
        'plans',
        'support',
        'bottomNav'
    ];

    views.forEach(v => {
        if (window.NutReBirthComponents[v]) {
            frame.insertAdjacentHTML('beforeend', window.NutReBirthComponents[v]);
        }
    });

    if (typeof generateProgramLogic === 'function') {
        generateProgramLogic(typeof activeProgram !== 'undefined' ? activeProgram : 'athletic');
    }
});
