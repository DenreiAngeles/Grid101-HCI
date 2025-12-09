/**
 * GRID 101 - INTERACTION LOGIC
 */

let currentTeam = 'redbull';

/* --- TEAM SWITCHER LOGIC (ALL 10 TEAMS + DRIVERS + POINTS DATA) --- */
const teamData = {
    redbull: {
        color: '#3671C6',
        img: 'assets/cars/2025redbullracingcarright.avif',
        drivers: 'Max Verstappen (1)<br>Yuki Tsunoda (22)',
        placeholder: 'https://placehold.co/900x300/transparent/3671C6?text=RED+BULL+RB19',
        name: 'RED BULL RACING',
        points: { driver1: 315, driver2: 290, constructor: 605 }
    },
    mercedes: {
        color: '#00D2BE',
        img: 'assets/cars/2025mercedescarright.avif',
        drivers: 'George Russell (63)<br>Kimi Antonelli (12)',
        placeholder: 'https://placehold.co/900x300/transparent/00D2BE?text=MERCEDES+W15',
        name: 'MERCEDES-AMG F1',
        points: { driver1: 250, driver2: 220, constructor: 470 }
    },
    ferrari: {
        color: '#E80020',
        img: 'assets/cars/2025ferraricarright.avif',
        drivers: 'Charles Leclerc (16)<br>Lewis Hamilton (44)',
        placeholder: 'https://placehold.co/900x300/transparent/E80020?text=FERRARI+SF-24',
        name: 'SCUDERIA FERRARI',
        points: { driver1: 270, driver2: 280, constructor: 550 }
    },
    mclaren: {
        color: '#FF8700',
        img: 'assets/cars/2025mclarencarright.avif',
        drivers: 'Lando Norris (4)<br>Oscar Piastri (81)',
        placeholder: 'https://placehold.co/900x300/transparent/FF8700?text=MCLAREN+MCL38',
        name: 'MCLAREN F1 TEAM',
        points: { driver1: 190, driver2: 185, constructor: 375 }
    },
    astonmartin: {
        color: '#229971',
        img: 'assets/cars/2025astonmartincarright.avif',
        drivers: 'Fernando Alonso (14)<br>Lance Stroll (18)',
        placeholder: 'https://placehold.co/900x300/transparent/229971?text=ASTON+MARTIN+AMR24',
        name: 'ASTON MARTIN F1',
        points: { driver1: 130, driver2: 50, constructor: 180 }
    },
    alpine: {
        color: '#0090FF',
        img: 'assets/cars/2025alpinecarright.avif',
        drivers: 'Pierre Gasly (10)<br>Jack Doohan (7)',
        placeholder: 'https://placehold.co/900x300/transparent/0090FF?text=ALPINE+A524',
        name: 'ALPINE F1 TEAM',
        points: { driver1: 65, driver2: 30, constructor: 95 }
    },
    williams: {
        color: '#64C4FF',
        img: 'assets/cars/2025williamscarright.avif',
        drivers: 'Alexander Albon (23)<br>Carlos Sainz (55)',
        placeholder: 'https://placehold.co/900x300/transparent/64C4FF?text=WILLIAMS+FW46',
        name: 'WILLIAMS RACING',
        points: { driver1: 25, driver2: 45, constructor: 70 }
    },
    rb: {
        color: '#1634CB',
        img: 'assets/cars/2025racingbullscarright.avif',
        drivers: 'Liam Lawson (30)<br>Isack Hadjar (6)',
        placeholder: 'https://placehold.co/900x300/transparent/1634CB?text=VCARB+01',
        name: 'VISA CASH APP RB',
        points: { driver1: 40, driver2: 10, constructor: 50 }
    },
    sauber: {
        color: '#52E252',
        img: 'assets/cars/2025kicksaubercarright.avif',
        drivers: 'Nico Hulkenberg (27)<br>Gabriel Bortoleto (5)',
        placeholder: 'https://placehold.co/900x300/transparent/52E252?text=KICK+SAUBER+C44',
        name: 'KICK SAUBER F1',
        points: { driver1: 5, driver2: 0, constructor: 5 }
    },
    haas: {
        color: '#E6002B',
        img: 'assets/cars/2025haascarright.avif',
        drivers: 'Esteban Ocon (31)<br>Oliver Bearman (87)',
        placeholder: 'https://placehold.co/900x300/transparent/E6002B?text=HAAS+VF-24',
        name: 'HAAS F1 TEAM',
        points: { driver1: 15, driver2: 8, constructor: 23 }
    }
};

function changeTeam(teamKey) {
    currentTeam = teamKey;
    const data = teamData[teamKey];
    const root = document.documentElement;
    const carImg = document.getElementById('hero-car');
    const dots = document.querySelectorAll('.team-logo-btn');
    const driverText = document.getElementById('hero-driver-names');
    const teamLabel = document.getElementById('hero-team-label');

    root.style.setProperty('--color-primary', data.color);

    if (driverText && data.drivers) {
        driverText.style.opacity = '0';
        setTimeout(() => {
            driverText.innerHTML = data.drivers;
            driverText.style.opacity = '1';
        }, 150);
    }

    if (teamLabel && data.name) {
        teamLabel.style.opacity = '0';
        setTimeout(() => {
            teamLabel.innerText = data.name;
            teamLabel.style.opacity = '1';
        }, 300);
    }

    carImg.style.opacity = '0';
    carImg.style.transform = 'translateX(50px)';

    setTimeout(() => {
        carImg.onerror = function () {
            this.src = data.placeholder;
            this.onerror = null;
        };

        carImg.src = data.img;
        carImg.style.opacity = '1';
        carImg.style.transform = 'translateX(0)';
    }, 300);

    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('onclick').includes(teamKey)) {
            dot.classList.add('active');
        }
    });

    updateChampionshipViewer();
}

/* --- ESSENTIALS: CHAMPIONSHIP VIEWER LOGIC --- */
function updateChampionshipViewer() {
    const data = teamData[currentTeam];
    if (!data) return;

    const driverNamesFull = data.drivers.split('<br>');

    const driver1Value = document.getElementById('driver1-value');
    const driver1Label = document.getElementById('driver1-label');
    const driver2Value = document.getElementById('driver2-value');
    const driver2Label = document.getElementById('driver2-label');

    const getFirstName = (fullName) => fullName.split('(')[0].trim().toUpperCase();

    if (driver1Value) driver1Value.innerText = data.points.driver1;
    if (driver1Label) driver1Label.innerText = getFirstName(driverNamesFull[0]);
    if (driver2Value) driver2Value.innerText = data.points.driver2;
    if (driver2Label) driver2Label.innerText = getFirstName(driverNamesFull[1]);

    const constructorValue = document.getElementById('constructor-value');
    if (constructorValue) constructorValue.innerText = data.points.constructor;
}

function showChampionship(view) {
    const driversView = document.getElementById('view-drivers');
    const constructorsView = document.getElementById('view-constructors');
    const btnDrivers = document.getElementById('btn-drivers');
    const btnConstructors = document.getElementById('btn-constructors');

    btnDrivers.classList.add('secondary');
    btnConstructors.classList.add('secondary');

    if (view === 'drivers') {
        driversView.style.display = 'flex';
        constructorsView.style.display = 'none';
        btnDrivers.classList.remove('secondary');
    } else if (view === 'constructors') {
        driversView.style.display = 'none';
        constructorsView.style.display = 'block';
        btnConstructors.classList.remove('secondary');
    }
}


/* --- 2. TAB SYSTEM (5 PHASES) --- */
function switchTab(tabName) {
    const contents = ['essentials', 'weekend', 'mechanics', 'strategy', 'guide', 'vocabs'];

    contents.forEach(name => {
        const el = document.getElementById('content-' + name);
        if (el) el.style.display = 'none';
    });

    const selected = document.getElementById('content-' + tabName);
    if (selected) {
        if (selected.classList.contains('weekend-grid')) {
            selected.style.display = 'grid';
        } else {
            selected.style.display = 'block';
        }
    }

    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => btn.classList.remove('active-tab'));

    if (typeof event !== 'undefined' && event.target) {
        event.target.classList.add('active-tab');
    }
}

/* --- NEW: WEEKEND FORMAT LOGIC --- */
function showWeekendFormat(format) {
    const standardSchedule = document.getElementById('schedule-standard');
    const sprintSchedule = document.getElementById('schedule-sprint');
    const btnStandard = document.getElementById('btn-standard');
    const btnSprint = document.getElementById('btn-sprint');

    btnStandard.classList.add('secondary');
    btnSprint.classList.add('secondary');

    if (format === 'standard') {
        standardSchedule.style.display = 'block';
        sprintSchedule.style.display = 'none';
        btnStandard.classList.remove('secondary');
    } else if (format === 'sprint') {
        standardSchedule.style.display = 'none';
        sprintSchedule.style.display = 'block';
        btnSprint.classList.remove('secondary');
    }
}

/* --- NEW: FLAG VISUALIZER LOGIC (Phase 3) --- */
function showFlagVisual(flag, status, meaning) {
    const panel = document.getElementById('flag-visual-panel');
    const statusText = document.getElementById('flag-status-text');
    const meaningText = document.getElementById('flag-meaning-text');

    panel.className = 'flag-display-panel';
    panel.classList.add(`flag-${flag}`);

    statusText.innerText = status;
    meaningText.innerText = meaning;

    if (flag === 'checkered') {
        statusText.style.color = 'black';
        meaningText.style.color = 'black';
    } else if (flag === 'yellow') {
        statusText.style.color = 'black';
        meaningText.style.color = 'black';
    } else if (flag === 'sc') {
        statusText.style.color = 'black';
        meaningText.style.color = 'black';
    } else {
        statusText.style.color = 'white';
        meaningText.style.color = 'white';
    }
}

/* --- NEW: PENALTY VISUALIZER LOGIC (Phase 4) --- */
function showPenaltyVisual(penaltyType, status, explanation) {
    const panel = document.getElementById('penalty-visual-panel');
    const statusText = document.getElementById('penalty-status-text');
    const meaningText = document.getElementById('penalty-meaning-text');

    panel.className = 'penalty-display-panel';
    panel.classList.add(`penalty-${penaltyType}`);

    statusText.innerText = status;
    meaningText.innerText = explanation;

    if (penaltyType === '5s') {
        statusText.style.color = 'black';
        meaningText.style.color = 'black';
    } else {
        statusText.style.color = 'white';
        meaningText.style.color = 'white';
    }
}

/* --- 3. TRACK SWITCHER LOGIC --- */
function changeTrack(trackName) {
    const tracks = document.querySelectorAll('.track-svg-container');
    tracks.forEach(track => track.classList.remove('active-track'));

    document.getElementById('track-' + trackName).classList.add('active-track');

    const buttons = document.querySelectorAll('.track-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    if (event && event.target) {
        event.target.classList.add('active');
    }
}

/* --- 4. DRS SIMULATOR LOGIC (UPDATED FOR IMAGE SWAP) --- */
function toggleDRS(isOpen) {
    const img = document.getElementById('drs-img');
    const badge = document.getElementById('drs-status-text');

    const closedSrc = 'assets/drs/close.png';
    const openSrc = 'assets/drs/open.png';

    const closedPlaceholder = 'https://placehold.co/200x200/F3F4F6/15151E?text=REAR+WING+(CLOSED)';
    const openPlaceholder = 'https://placehold.co/200x200/3671C6/FFFFFF?text=DRS+OPEN+(LESS+DRAG)';

    if (isOpen) {
        img.src = openSrc;
        img.onerror = function () { this.src = openPlaceholder; this.onerror = null; };

        badge.innerText = "OPEN";
        badge.style.background = "#2ecc71";
    } else {
        img.src = closedSrc;
        img.onerror = function () { this.src = closedPlaceholder; this.onerror = null; };

        badge.innerText = "CLOSED";
        badge.style.background = "rgba(0,0,0,0.7)";
    }
}

/* --- 5. QUIZ FORM SUBMISSION (NEW GRADING LOGIC) --- */
function submitQuiz(e) {
    e.preventDefault();

    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    const successMsg = document.getElementById('success-msg');

    const correctAnswers = {
        q1_flag: 'red',
        q2_tire_compound: 'c5',
        q3_penalty: 'stopgo',
        q4_strategy: 'undercut'
    };

    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    const formData = new FormData(form);

    const cadetName = formData.get('cadet-name');
    let incorrectQuestions = [];

    for (const questionName in correctAnswers) {
        const userAnswer = formData.get(questionName);
        if (userAnswer === correctAnswers[questionName]) {
            score++;
        } else {
            incorrectQuestions.push(questionName.split('_')[0].toUpperCase());
        }
    }

    const passed = score >= 3;

    btn.innerText = "PROCESSING TELEMETRY...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.opacity = "1";
        btn.disabled = false;

        if (passed) {
            successMsg.style.display = 'block';
            successMsg.style.borderColor = '#2ecc71';
            successMsg.style.color = '#27ae60';
            successMsg.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
            successMsg.innerHTML = `
                <strong>✓ SUPERLICENSE GRANTED!</strong><br>
                ${cadetName}, you scored ${score}/${totalQuestions}.<br>
                Welcome to the Grid.
            `;
            form.reset();
        } else {
            successMsg.style.display = 'block';
            successMsg.style.borderColor = '#e74c3c';
            successMsg.style.color = '#c0392b';
            successMsg.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
            successMsg.innerHTML = `
                <strong>⚠ TEST FAILED (${score}/${totalQuestions})</strong><br>
                Review required. Focus on sections: ${incorrectQuestions.join(', ')}.
            `;
        }

        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 8000);

    }, 1000);
}

/* --- 6. SCROLL SPY & INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => link.classList.remove('active'));

                const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    showChampionship('drivers');
    updateChampionshipViewer();

    showWeekendFormat('standard');

    showFlagVisual('green', 'TRACK CLEAR', 'The session is running normally and overtaking is permitted.');

    showPenaltyVisual('5s', '5 SECOND PENALTY', 'Minor offense (e.g., track limits violation). Added to total race time.');
});