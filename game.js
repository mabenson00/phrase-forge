(function () {
'use strict';

/* ============================================================
   CONSTANTS
   ============================================================ */

var LAUNCH_DATE = new Date(2026, 1, 17);

var GAME_META = {
    bridges:   { icon: '🌉', title: 'Bridges',   tagline: 'Find the word that connects two phrases',    color: 'bridges'   },
    shatter:   { icon: '💎', title: 'Shatter',    tagline: 'Reassemble the shattered phrase',            color: 'shatter'   },
    veil:      { icon: '🎭', title: 'Veil',       tagline: 'Reveal hidden phrases letter by letter',     color: 'veil'      },
    echo:      { icon: '📡', title: 'Echo',       tagline: 'Guess the phrase before it fully appears',   color: 'echo'      },
    fragments: { icon: '🧩', title: 'Fragments',  tagline: 'Piece together the scrambled fragments',     color: 'fragments' }
};

var GAME_ORDER = ['bridges', 'shatter', 'veil', 'echo', 'fragments'];

/* ============================================================
   PUZZLE DATA — 7 per game
   ============================================================ */

var PUZZLES = {

    /* ---------- BRIDGES ---------- */
    bridges: [
        {
            phrase1: 'THUNDER', phrase2: 'TROOPER', bridge: 'STORM',
            fullPhrase1: 'THUNDERSTORM', fullPhrase2: 'STORMTROOPER',
            cat1: "Nature's Light Show", cat2: 'Sci-Fi Infantry',
            revealOrder1: [2, 4, 1, 3, 6, 5, 0],
            revealOrder2: [4, 2, 3, 1, 6, 5, 0]
        },
        {
            phrase1: 'BREAK', phrase2: 'FOOD', bridge: 'FAST',
            fullPhrase1: 'BREAKFAST', fullPhrase2: 'FAST FOOD',
            cat1: 'Morning Meal', cat2: 'Drive-Thru Fare',
            revealOrder1: [4, 0, 1, 2, 3],
            revealOrder2: [0, 3, 1, 2]
        },
        {
            phrase1: 'FIRE', phrase2: 'OUT', bridge: 'WORK',
            fullPhrase1: 'FIREWORK', fullPhrase2: 'WORKOUT',
            cat1: 'Fourth of July Spectacle', cat2: 'Gym Session',
            revealOrder1: [0, 1, 2, 3],
            revealOrder2: [1, 0, 2]
        },
        {
            phrase1: 'BLACK', phrase2: 'CAGE', bridge: 'BIRD',
            fullPhrase1: 'BLACKBIRD', fullPhrase2: 'BIRDCAGE',
            cat1: 'Beatles Song', cat2: 'Robin Williams Film',
            revealOrder1: [4, 0, 3, 1, 2],
            revealOrder2: [2, 0, 1, 3]
        },
        {
            phrase1: 'HEAD', phrase2: 'WIDTH', bridge: 'BAND',
            fullPhrase1: 'HEADBAND', fullPhrase2: 'BANDWIDTH',
            cat1: 'Hair Accessory', cat2: 'Internet Measure',
            revealOrder1: [3, 0, 1, 2],
            revealOrder2: [0, 2, 4, 1, 3]
        },
        {
            phrase1: 'MOON', phrase2: 'HOUSE', bridge: 'LIGHT',
            fullPhrase1: 'MOONLIGHT', fullPhrase2: 'LIGHTHOUSE',
            cat1: 'Oscar-Winning Film', cat2: 'Coastal Beacon',
            revealOrder1: [0, 3, 1, 2],
            revealOrder2: [0, 2, 3, 1, 4]
        },
        {
            phrase1: 'BACK', phrase2: 'FLY', bridge: 'FIRE',
            fullPhrase1: 'BACKFIRE', fullPhrase2: 'FIREFLY',
            cat1: 'Plan Gone Wrong', cat2: 'Joss Whedon Sci-Fi',
            revealOrder1: [3, 0, 2, 1],
            revealOrder2: [2, 0, 1]
        }
    ],

    /* ---------- SHATTER ---------- */
    shatter: [
        {
            answer: 'MOUNT EVEREST', category: 'Natural Wonder',
            pieces: ['VENTURE', 'MOTES'],
            decoys: ['MONET', 'SERVE', 'STERN', 'MOUSE']
        },
        {
            answer: 'GOLDEN GATE', category: 'Famous Bridge',
            pieces: ['OGLED', 'AGENT'],
            decoys: ['LODGE', 'TANGO', 'NOTED', 'EAGLE']
        },
        {
            answer: 'CENTRAL PARK', category: 'NYC Landmark',
            pieces: ['PLANTER', 'RACK'],
            decoys: ['CARPET', 'RENTAL', 'CLANK', 'REACT']
        },
        {
            answer: 'HARRY POTTER', category: 'Wizarding World',
            pieces: ['TROPHY', 'RATER'],
            decoys: ['POETRY', 'PARROT', 'HOTTER', 'PARTY']
        },
        {
            answer: 'MAGIC CARPET', category: 'Aladdin\'s Ride',
            pieces: ['GRIMACE', 'PACT'],
            decoys: ['IMPACT', 'TRAGIC', 'PIRATE', 'CREAM']
        },
        {
            answer: 'GRAND PIANO', category: 'Musical Instrument',
            pieces: ['ADORING', 'PAN'],
            decoys: ['GRIND', 'PRONG', 'RAPID', 'DOING']
        },
        {
            answer: 'NORTH POLE', category: "Santa's Home",
            pieces: ['HONOR', 'PELT'],
            decoys: ['PHONE', 'LEMON', 'TENOR', 'OTHER']
        }
    ],

    /* ---------- VEIL ---------- */
    veil: [
        {
            category: 'Famous Artworks',
            phrases: ['STARRY NIGHT', 'THE SCREAM', 'GUERNICA', 'MONA LISA', 'WATER LILIES']
        },
        {
            category: 'Disney Movies',
            phrases: ['FROZEN', 'THE LION KING', 'ALADDIN', 'MULAN', 'FINDING NEMO']
        },
        {
            category: 'World Capitals',
            phrases: ['TOKYO', 'LONDON', 'PARIS', 'CAIRO', 'BUENOS AIRES']
        },
        {
            category: 'Types of Dance',
            phrases: ['BALLET', 'SALSA', 'TANGO', 'WALTZ', 'FLAMENCO']
        },
        {
            category: 'Shakespeare Plays',
            phrases: ['HAMLET', 'OTHELLO', 'MACBETH', 'THE TEMPEST', 'ROMEO AND JULIET']
        },
        {
            category: 'Olympic Sports',
            phrases: ['GYMNASTICS', 'FENCING', 'ARCHERY', 'TRIATHLON', 'WATER POLO']
        },
        {
            category: 'Space Missions',
            phrases: ['APOLLO', 'GEMINI', 'VOYAGER', 'CHALLENGER', 'DISCOVERY']
        }
    ],

    /* ---------- ECHO ---------- */
    echo: [
        {
            answer: 'BOHEMIAN RHAPSODY', category: 'Iconic Rock Song',
            revealOrder: [15, 14, 11, 0, 4, 8, 12, 2, 9, 7, 5, 6, 10, 1, 13, 3]
        },
        {
            answer: 'JURASSIC PARK', category: 'Spielberg Blockbuster',
            revealOrder: [11, 0, 6, 8, 1, 5, 3, 4, 2, 10, 7, 9]
        },
        {
            answer: 'STAIRWAY TO HEAVEN', category: 'Led Zeppelin Classic',
            revealOrder: [5, 7, 13, 10, 15, 3, 4, 0, 1, 8, 9, 2, 6, 12, 11, 14]
        },
        {
            answer: 'GONE WITH THE WIND', category: 'Epic Civil War Film',
            revealOrder: [14, 0, 4, 11, 7, 9, 6, 8, 2, 13, 5, 12, 1, 3, 10]
        },
        {
            answer: 'THUNDERSTRUCK', category: 'AC/DC Anthem',
            revealOrder: [12, 11, 4, 2, 10, 1, 7, 3, 0, 8, 6, 9, 5]
        },
        {
            answer: 'YELLOW SUBMARINE', category: 'Beatles Hit',
            revealOrder: [0, 5, 8, 9, 7, 11, 13, 12, 6, 2, 3, 10, 4, 1, 14]
        },
        {
            answer: 'IMAGINE DRAGONS', category: 'Modern Rock Band',
            revealOrder: [7, 1, 13, 11, 8, 3, 10, 5, 12, 0, 4, 2, 9, 6]
        }
    ],

    /* ---------- FRAGMENTS ---------- */
    fragments: [
        {
            answer: 'JURASSIC PARK', answerNoSpaces: 'JURASSICPARK', category: 'Blockbuster Movie',
            fragments: ['JU', 'RA', 'SS', 'IC', 'PA', 'RK'],
            decoys: ['AR', 'KI', 'SP', 'CU', 'AS', 'RI']
        },
        {
            answer: 'SUPER MARIO', answerNoSpaces: 'SUPERMARIO', category: 'Video Game Icon',
            fragments: ['SU', 'PE', 'RM', 'AR', 'IO'],
            decoys: ['MA', 'RI', 'UP', 'OS', 'ER']
        },
        {
            answer: 'BUBBLE WRAP', answerNoSpaces: 'BUBBLEWRAP', category: 'Popping Pastime',
            fragments: ['BU', 'BB', 'LE', 'WR', 'AP'],
            decoys: ['BL', 'WA', 'PB', 'RU', 'EB']
        },
        {
            answer: 'CHEESEBURGER', answerNoSpaces: 'CHEESEBURGER', category: 'Fast Food Classic',
            fragments: ['CH', 'EE', 'SE', 'BU', 'RG', 'ER'],
            decoys: ['BE', 'GR', 'EC', 'SH', 'UE', 'RS']
        },
        {
            answer: 'GINGER SNAP', answerNoSpaces: 'GINGERSNAP', category: 'Holiday Cookie',
            fragments: ['GI', 'NG', 'ER', 'SN', 'AP'],
            decoys: ['GE', 'RA', 'NI', 'PS', 'SG']
        },
        {
            answer: 'PEANUT BUTTER', answerNoSpaces: 'PEANUTBUTTER', category: 'Sandwich Spread',
            fragments: ['PE', 'AN', 'UT', 'BU', 'TT', 'ER'],
            decoys: ['BE', 'TN', 'UP', 'AT', 'RE', 'NU']
        },
        {
            answer: 'TREASURE', answerNoSpaces: 'TREASURE', category: "Pirate's Goal",
            fragments: ['TR', 'EA', 'SU', 'RE'],
            decoys: ['TE', 'RS', 'AU', 'ER', 'US']
        }
    ]
};

/* ============================================================
   STATE
   ============================================================ */

var state = {
    view: 'home',
    currentGame: null,
    currentDay: 0,
    timerInterval: null,
    elapsed: 0,
    scores: {}
};

var gs = {};

/* ============================================================
   INIT / STORAGE
   ============================================================ */

function init() {
    loadScores();
    renderHome();
}

function loadScores() {
    try {
        var raw = localStorage.getItem('pf_scores_v2');
        if (raw) state.scores = JSON.parse(raw);
    } catch (e) { state.scores = {}; }
}

function saveScores() {
    try { localStorage.setItem('pf_scores_v2', JSON.stringify(state.scores)); } catch (e) {}
}

function getScore(gameId, dayIdx) {
    var g = state.scores[gameId];
    if (!g || typeof g !== 'object') return null;
    return g[dayIdx] !== undefined ? g[dayIdx] : null;
}

function setScore(gameId, dayIdx, score) {
    if (!state.scores[gameId] || typeof state.scores[gameId] !== 'object') state.scores[gameId] = {};
    var prev = state.scores[gameId][dayIdx];
    if (prev === undefined || score > prev) state.scores[gameId][dayIdx] = score;
    saveScores();
}

/* ============================================================
   DAY HELPERS
   ============================================================ */

function getTodayIndex(gameId) {
    var now = new Date();
    var diff = Math.floor((now.getTime() - LAUNCH_DATE.getTime()) / 86400000);
    if (diff < 0) diff = 0;
    return diff % PUZZLES[gameId].length;
}

function getCompletedCount(gameId) {
    var g = state.scores[gameId];
    if (!g || typeof g !== 'object') return 0;
    return Object.keys(g).length;
}

/* ============================================================
   TIMER
   ============================================================ */

function startTimer() {
    state.elapsed = 0;
    var el = document.getElementById('timer');
    if (el) el.textContent = '0:00';
    state.timerInterval = setInterval(function () {
        state.elapsed++;
        var el2 = document.getElementById('timer');
        if (el2) el2.textContent = formatTime(state.elapsed);
    }, 1000);
}

function stopTimer() {
    if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; }
}

function formatTime(s) { return Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60); }

/* ============================================================
   CLEANUP
   ============================================================ */

function cleanup() {
    stopTimer();
    if (gs.echoInterval) { clearInterval(gs.echoInterval); gs.echoInterval = null; }
}

/* ============================================================
   UTILITIES
   ============================================================ */

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function getStars(score) { return score >= 90 ? 3 : score >= 60 ? 2 : score > 0 ? 1 : 0; }
function starStr(n) { var s = ''; for (var i = 0; i < 3; i++) s += i < n ? '⭐' : '☆'; return s; }

function showToast(msg, type) {
    type = type || 'info';
    var c = document.getElementById('toast-container');
    var t = document.createElement('div');
    t.className = 'toast ' + type;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 3000);
}

function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
}

function gameChrome(gameId, innerHtml) {
    var m = GAME_META[gameId];
    var dayLabel = 'Day ' + (state.currentDay + 1);
    return '<div class="game-screen">' +
        '<div class="game-top-bar">' +
            '<button class="back-btn" id="back-btn">← Back</button>' +
            '<span class="game-timer" id="timer">0:00</span>' +
        '</div>' +
        '<div class="game-title-bar">' +
            '<h2 class="' + m.color + '-title">' + m.icon + ' ' + m.title + ' — ' + dayLabel + '</h2>' +
        '</div>' +
        innerHtml +
    '</div>';
}

function bindBack() {
    var btn = document.getElementById('back-btn');
    if (btn) btn.addEventListener('click', function () {
        cleanup();
        renderPicker(state.currentGame);
    });
}

/* ============================================================
   HOME SCREEN
   ============================================================ */

function renderHome() {
    cleanup();
    state.view = 'home';
    state.currentGame = null;
    var app = document.getElementById('app');
    var todayIdx = getTodayIndex(GAME_ORDER[0]);
    var html = '<div class="home-header">' +
        '<h1>Phrase Forge</h1>' +
        '<p>Daily word puzzles — test your knowledge and wordplay</p>' +
    '</div>';
    html += '<div class="game-grid">';
    for (var i = 0; i < GAME_ORDER.length; i++) {
        var id = GAME_ORDER[i];
        var m = GAME_META[id];
        var done = getCompletedCount(id);
        var total = PUZZLES[id].length;
        var progress = done > 0 ? starStr(3) + ' ' + done + '/' + total + ' completed' : 'Not started';
        html += '<div class="game-card" data-game="' + id + '">' +
            '<span class="card-icon">' + m.icon + '</span>' +
            '<div class="card-title">' + m.title + '</div>' +
            '<div class="card-tagline">' + m.tagline + '</div>' +
            '<div class="card-score">' + progress + '</div>' +
        '</div>';
    }
    html += '</div>';
    app.innerHTML = html;

    var cards = app.querySelectorAll('.game-card');
    for (var c = 0; c < cards.length; c++) {
        cards[c].addEventListener('click', (function (gid) {
            return function () { renderPicker(gid); };
        })(cards[c].getAttribute('data-game')));
    }
}

/* ============================================================
   PICKER SCREEN
   ============================================================ */

function renderPicker(gameId) {
    cleanup();
    state.view = 'picker';
    state.currentGame = gameId;
    var m = GAME_META[gameId];
    var puzzles = PUZZLES[gameId];
    var todayIdx = getTodayIndex(gameId);
    var app = document.getElementById('app');

    var html = '<div class="picker-screen">' +
        '<div class="game-top-bar">' +
            '<button class="back-btn" id="back-btn">← Home</button>' +
        '</div>' +
        '<div class="picker-header">' +
            '<span class="picker-icon">' + m.icon + '</span>' +
            '<h2>' + m.title + '</h2>' +
            '<p>' + m.tagline + '</p>' +
        '</div>' +
        '<div class="picker-grid">';

    for (var i = 0; i < puzzles.length; i++) {
        var sc = getScore(gameId, i);
        var isToday = (i === todayIdx);
        var cls = 'day-card';
        if (isToday) cls += ' today';
        if (sc !== null) cls += ' completed';
        html += '<div class="' + cls + '" data-day="' + i + '">';
        html += '<div class="day-number">Day ' + (i + 1) + '</div>';
        if (isToday) html += '<div class="day-badge">TODAY</div>';
        if (sc !== null) {
            html += '<div class="day-score">' + sc + '</div>';
            html += '<div class="day-stars">' + starStr(getStars(sc)) + '</div>';
        } else {
            html += '<div class="day-play">Play</div>';
        }
        html += '</div>';
    }

    html += '</div></div>';
    app.innerHTML = html;

    document.getElementById('back-btn').addEventListener('click', function () { renderHome(); });

    var dayCards = app.querySelectorAll('.day-card');
    for (var d = 0; d < dayCards.length; d++) {
        dayCards[d].addEventListener('click', (function (idx) {
            return function () { launchGame(gameId, idx); };
        })(parseInt(dayCards[d].getAttribute('data-day'), 10)));
    }
}

/* ============================================================
   LAUNCH GAME
   ============================================================ */

function launchGame(gameId, dayIdx) {
    cleanup();
    state.view = 'game';
    state.currentGame = gameId;
    state.currentDay = dayIdx;
    gs = {};
    var fn = {
        bridges: initBridges,
        shatter: initShatter,
        veil: initVeil,
        echo: initEcho,
        fragments: initFragments
    };
    fn[gameId]();
}

/* ============================================================
   RESULTS SCREEN
   ============================================================ */

function showResults(gameId, score, stats, answerText) {
    cleanup();
    score = clamp(Math.round(score), 0, 100);
    setScore(gameId, state.currentDay, score);
    var stars = getStars(score);
    var m = GAME_META[gameId];
    var dayLabel = 'Day ' + (state.currentDay + 1);

    var html = '<div class="results-screen">' +
        '<div class="results-panel">' +
            '<div class="results-stars">' + starStr(stars) + '</div>' +
            '<div class="results-score" style="color:var(--' + m.color + ')">' + score + '</div>' +
            '<div class="results-score-label">Score — ' + m.title + ' ' + dayLabel + '</div>' +
            '<div class="results-stats">';
    for (var i = 0; i < stats.length; i++) {
        html += '<div class="results-stat"><div class="stat-value">' + stats[i].value + '</div><div class="stat-label">' + stats[i].label + '</div></div>';
    }
    html += '</div>';
    if (answerText) html += '<div class="results-answer">' + answerText + '</div>';
    html += '<div class="game-actions">' +
        '<button class="btn btn-' + m.color + '" id="res-pick">All Days</button>' +
        '<button class="btn btn-outline" id="res-home">Home</button>' +
    '</div></div></div>';

    document.getElementById('app').innerHTML = html;
    document.getElementById('res-pick').addEventListener('click', function () { renderPicker(gameId); });
    document.getElementById('res-home').addEventListener('click', function () { renderHome(); });
}

function giveUpGame(gameId, answerText) {
    cleanup();
    setScore(gameId, state.currentDay, 0);
    var m = GAME_META[gameId];
    var dayLabel = 'Day ' + (state.currentDay + 1);

    var html = '<div class="results-screen">' +
        '<div class="results-panel">' +
            '<div class="results-stars">😔</div>' +
            '<div class="results-score" style="color:var(--error)">0</div>' +
            '<div class="results-score-label">' + m.title + ' ' + dayLabel + ' — Gave Up</div>' +
            '<div class="results-answer">The answer was:<br><strong>' + answerText + '</strong></div>' +
            '<div class="game-actions">' +
                '<button class="btn btn-' + m.color + '" id="res-pick">All Days</button>' +
                '<button class="btn btn-outline" id="res-home">Home</button>' +
            '</div>' +
        '</div></div>';
    document.getElementById('app').innerHTML = html;
    document.getElementById('res-pick').addEventListener('click', function () { renderPicker(gameId); });
    document.getElementById('res-home').addEventListener('click', function () { renderHome(); });
}

/* ============================================================
   BRIDGES
   ============================================================ */

function initBridges() {
    var p = PUZZLES.bridges[state.currentDay];
    gs = {
        wrongGuesses: 0,
        revealStep: 0,
        side1Solved: false,
        side2Solved: false
    };
    renderBridges();
    startTimer();
}

function renderBridges() {
    var p = PUZZLES.bridges[state.currentDay];
    var revealed1 = gs.revealStep;
    var revealed2 = gs.revealStep;

    var leftCells = '';
    for (var i = 0; i < p.phrase1.length; i++) {
        var show = gs.side1Solved || (p.revealOrder1.indexOf(i) < revealed1);
        leftCells += '<div class="bridges-letter-cell ' + (show ? 'revealed' : 'hidden') + '">' + (show ? p.phrase1[i] : '?') + '</div>';
    }

    var rightCells = '';
    for (var j = 0; j < p.phrase2.length; j++) {
        var show2 = gs.side2Solved || (p.revealOrder2.indexOf(j) < revealed2);
        rightCells += '<div class="bridges-letter-cell ' + (show2 ? 'revealed' : 'hidden') + '">' + (show2 ? p.phrase2[j] : '?') + '</div>';
    }

    var bridgeBlanks = '';
    for (var k = 0; k < p.bridge.length; k++) {
        bridgeBlanks += '<div class="bridges-letter-cell">?</div>';
    }

    var info = '';
    if (gs.wrongGuesses > 0) info = 'Wrong guesses: ' + gs.wrongGuesses;

    var inner = '<div class="game-panel"><div class="bridges-layout">' +
        '<p class="instructions">Two phrases share a hidden bridge word. You can guess the bridge word OR either side word. Correct side guesses fill in for free. Wrong guesses reveal a letter.</p>' +
        '<div class="bridges-phrases">' +
            '<div class="bridges-side"><div class="side-category">' + p.cat1 + '</div><div class="side-letters">' + leftCells + '</div></div>' +
            '<div class="bridges-connector">🔗</div>' +
            '<div class="bridges-side"><div class="side-category">' + p.cat2 + '</div><div class="side-letters">' + rightCells + '</div></div>' +
        '</div>' +
        '<div class="bridges-bridge-area">' +
            '<div class="bridges-bridge-label">Bridge Word (' + p.bridge.length + ' letters)</div>' +
            '<div class="bridges-bridge-blanks">' + bridgeBlanks + '</div>' +
        '</div>' +
        '<div class="bridges-info">' + info + '</div>' +
        '<div class="input-row"><input type="text" class="text-input input-bridges" id="bridges-input" placeholder="Type your guess…" autocomplete="off"></div>' +
        '<div class="game-actions">' +
            '<button class="btn btn-bridges" id="bridges-submit">Submit</button>' +
            '<button class="btn btn-giveup" id="bridges-giveup">Give Up</button>' +
        '</div>' +
    '</div></div>';

    document.getElementById('app').innerHTML = gameChrome('bridges', inner);
    bindBack();

    var inp = document.getElementById('bridges-input');
    document.getElementById('bridges-submit').addEventListener('click', checkBridges);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') checkBridges(); });
    document.getElementById('bridges-giveup').addEventListener('click', function () {
        giveUpGame('bridges', p.fullPhrase1 + ' / ' + p.fullPhrase2 + '<br>Bridge: ' + p.bridge);
    });
    inp.focus();
}

function checkBridges() {
    var p = PUZZLES.bridges[state.currentDay];
    var inp = document.getElementById('bridges-input');
    var guess = inp.value.trim().toUpperCase().replace(/[^A-Z]/g, '');
    if (!guess) return;

    if (guess === p.bridge) {
        var timePen = Math.min(30, Math.floor(state.elapsed / 10));
        var wrongPen = gs.wrongGuesses * 12;
        var score = 100 - timePen - wrongPen;
        showResults('bridges', score, [
            { value: formatTime(state.elapsed), label: 'Time' },
            { value: String(gs.wrongGuesses), label: 'Wrong' }
        ], p.fullPhrase1 + '  ←  ' + p.bridge + '  →  ' + p.fullPhrase2);
        return;
    }

    if (guess === p.phrase1.replace(/[^A-Z]/g, '') && !gs.side1Solved) {
        gs.side1Solved = true;
        showToast(p.phrase1 + ' revealed!', 'success');
        inp.value = '';
        renderBridges();
        return;
    }

    if (guess === p.phrase2.replace(/[^A-Z]/g, '') && !gs.side2Solved) {
        gs.side2Solved = true;
        showToast(p.phrase2 + ' revealed!', 'success');
        inp.value = '';
        renderBridges();
        return;
    }

    gs.wrongGuesses++;
    gs.revealStep++;
    showToast('Not it — a letter has been revealed', 'error');
    inp.value = '';
    renderBridges();
}

/* ============================================================
   SHATTER
   ============================================================ */

function initShatter() {
    var p = PUZZLES.shatter[state.currentDay];
    var allTiles = shuffle(p.pieces.concat(p.decoys));
    gs = {
        tiles: allTiles.map(function (t, i) { return { text: t, idx: i, eliminated: false }; }),
        wrongGuesses: 0,
        selectedTiles: new Set()
    };
    renderShatter();
    startTimer();
}

function renderShatter() {
    var p = PUZZLES.shatter[state.currentDay];
    var tilesHtml = '';
    for (var i = 0; i < gs.tiles.length; i++) {
        var t = gs.tiles[i];
        var cls = 'shard';
        if (t.eliminated) { cls += ' eliminated'; }
        else {
            cls += ' active';
            if (gs.selectedTiles.has(i)) cls += ' selected';
        }
        tilesHtml += '<div class="' + cls + '" data-si="' + i + '">' + t.text + '</div>';
    }

    var selHtml = '';
    if (gs.selectedTiles.size > 0) {
        var combined = '';
        gs.selectedTiles.forEach(function (idx) { combined += gs.tiles[idx].text; });
        var sorted = combined.split('').sort().join('');
        selHtml = '<div class="shatter-selection-info">' +
            '<div class="sel-label">Selected letters (sorted)</div>' +
            '<div class="sel-letters">' + sorted + '</div>' +
        '</div>';
    } else {
        selHtml = '<div class="shatter-selection-info"><div class="sel-label">Click tiles to select them</div></div>';
    }

    var feedHtml = '<div class="shatter-feedback">';
    feedHtml += '<div class="info-line category">Category: ' + p.category + '</div>';
    var words = p.answer.split(' ');
    if (gs.wrongGuesses >= 1) {
        feedHtml += '<div class="info-line">Word count: ' + words.length + ' (' + words.map(function (w) { return w.length; }).join(', ') + ' letters)</div>';
    }
    if (gs.wrongGuesses >= 2) {
        feedHtml += '<div class="info-line">Starts with: ' + p.answer.replace(/ /g, '')[0] + '</div>';
    }
    feedHtml += '</div>';

    var inner = '<div class="game-panel">' +
        '<p class="instructions" style="text-align:center;margin-bottom:20px;">The answer is a well-known phrase whose letters have been split across tiles. Some tiles are decoys. Select the real tiles and type the answer. Wrong guesses eliminate a decoy and reveal clues.</p>' +
        feedHtml +
        '<div class="shatter-tiles">' + tilesHtml + '</div>' +
        selHtml +
        '<div class="input-row"><input type="text" class="text-input input-shatter" id="shatter-input" placeholder="Type the phrase…" autocomplete="off"></div>' +
        '<div class="game-actions">' +
            '<button class="btn btn-shatter" id="shatter-submit">Submit</button>' +
            '<button class="btn btn-giveup" id="shatter-giveup">Give Up</button>' +
        '</div>' +
    '</div>';

    document.getElementById('app').innerHTML = gameChrome('shatter', inner);
    bindBack();

    var shards = document.querySelectorAll('.shard.active');
    for (var s = 0; s < shards.length; s++) {
        shards[s].addEventListener('click', (function (idx) {
            return function () {
                if (gs.selectedTiles.has(idx)) gs.selectedTiles.delete(idx);
                else gs.selectedTiles.add(idx);
                renderShatter();
            };
        })(parseInt(shards[s].getAttribute('data-si'), 10)));
    }

    document.getElementById('shatter-submit').addEventListener('click', checkShatter);
    var inp = document.getElementById('shatter-input');
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') checkShatter(); });
    document.getElementById('shatter-giveup').addEventListener('click', function () {
        giveUpGame('shatter', p.answer);
    });
    inp.focus();
}

function checkShatter() {
    var p = PUZZLES.shatter[state.currentDay];
    var inp = document.getElementById('shatter-input');
    var guess = inp.value.trim().toUpperCase().replace(/[^A-Z]/g, '');
    var target = p.answer.replace(/[^A-Z]/g, '');
    if (!guess) return;

    if (guess === target) {
        var timePen = Math.min(30, Math.floor(state.elapsed / 10));
        var wrongPen = gs.wrongGuesses * 12;
        var score = 100 - timePen - wrongPen;
        showResults('shatter', score, [
            { value: formatTime(state.elapsed), label: 'Time' },
            { value: String(gs.wrongGuesses), label: 'Wrong' }
        ], p.answer);
        return;
    }

    gs.wrongGuesses++;
    shatterEliminateDecoy();
    showToast('Wrong — a decoy has been eliminated', 'error');
    inp.value = '';
    renderShatter();
}

function shatterEliminateDecoy() {
    var p = PUZZLES.shatter[state.currentDay];
    for (var i = 0; i < gs.tiles.length; i++) {
        if (!gs.tiles[i].eliminated && p.decoys.indexOf(gs.tiles[i].text) !== -1) {
            gs.tiles[i].eliminated = true;
            gs.selectedTiles.delete(i);
            return;
        }
    }
}

/* ============================================================
   VEIL
   ============================================================ */

function initVeil() {
    var p = PUZZLES.veil[state.currentDay];
    var allLetters = {};
    for (var i = 0; i < p.phrases.length; i++) {
        for (var j = 0; j < p.phrases[i].length; j++) {
            var ch = p.phrases[i][j];
            if (ch >= 'A' && ch <= 'Z') allLetters[ch] = true;
        }
    }
    gs = {
        revealedLetters: {},
        solvedPhrases: [],
        wrongLetters: {},
        correctLetters: allLetters,
        score: 100
    };
    for (var k = 0; k < p.phrases.length; k++) gs.solvedPhrases.push(false);
    renderVeil();
    startTimer();
}

function renderVeil() {
    var p = PUZZLES.veil[state.currentDay];
    var allSolved = true;

    var phrasesHtml = '<div class="veil-phrases">';
    for (var i = 0; i < p.phrases.length; i++) {
        var phrase = p.phrases[i];
        var isSolved = gs.solvedPhrases[i];
        if (!isSolved) allSolved = false;
        phrasesHtml += '<div class="veil-row' + (isSolved ? ' solved' : '') + '">';
        phrasesHtml += '<div class="veil-number">' + (i + 1) + '</div>';
        phrasesHtml += '<div class="veil-display">';
        for (var j = 0; j < phrase.length; j++) {
            var ch = phrase[j];
            if (ch === ' ') {
                phrasesHtml += '&nbsp;&nbsp;';
            } else if (isSolved) {
                phrasesHtml += '<span class="veil-solved-letter">' + ch + '</span>';
            } else if (gs.revealedLetters[ch]) {
                phrasesHtml += '<span class="veil-letter">' + ch + '</span>';
            } else {
                phrasesHtml += '<span class="veil-blank">_</span>';
            }
        }
        phrasesHtml += '</div>';
        if (!isSolved) {
            phrasesHtml += '<div class="veil-phrase-input">' +
                '<input type="text" class="text-input" data-pi="' + i + '" placeholder="Solve…" autocomplete="off">' +
                '<button class="btn btn-veil btn-sm" data-pi="' + i + '">→</button></div>';
        } else {
            phrasesHtml += '<div class="veil-solved-label">✓ Solved</div>';
        }
        phrasesHtml += '</div>';
    }
    phrasesHtml += '</div>';

    var alphaHtml = '<div class="veil-alphabet">';
    for (var c = 0; c < 26; c++) {
        var letter = String.fromCharCode(65 + c);
        var cls = 'letter-btn';
        if (gs.revealedLetters[letter]) cls += ' correct';
        else if (gs.wrongLetters[letter]) cls += ' wrong';
        alphaHtml += '<button class="' + cls + '" data-letter="' + letter + '">' + letter + '</button>';
    }
    alphaHtml += '</div>';

    var solvedCount = gs.solvedPhrases.filter(function (x) { return x; }).length;
    var statsHtml = '<div class="veil-stats">' +
        '<span>Solved: ' + solvedCount + '/' + p.phrases.length + '</span>' +
        '<span>Score: ' + Math.max(0, Math.round(gs.score)) + '</span>' +
    '</div>';

    var inner = '<div class="game-panel">' +
        '<p class="instructions" style="text-align:center;margin-bottom:16px;">Reveal letters using the alphabet below, then solve the hidden phrases. Correct letters cost 1 point. Wrong letters cost 4. Solve phrases for bonus points!</p>' +
        '<div class="veil-category-bar"><div class="label">Category</div><div class="value">' + p.category + '</div></div>' +
        phrasesHtml +
        alphaHtml +
        statsHtml +
        '<div class="game-actions">' +
            '<button class="btn btn-giveup" id="veil-giveup">Give Up</button>' +
        '</div>' +
    '</div>';

    document.getElementById('app').innerHTML = gameChrome('veil', inner);
    bindBack();

    var letterBtns = document.querySelectorAll('.letter-btn:not(.correct):not(.wrong)');
    for (var lb = 0; lb < letterBtns.length; lb++) {
        letterBtns[lb].addEventListener('click', function () {
            veilGuessLetter(this.getAttribute('data-letter'));
        });
    }

    var solveBtns = document.querySelectorAll('.veil-phrase-input .btn');
    for (var sb = 0; sb < solveBtns.length; sb++) {
        solveBtns[sb].addEventListener('click', function () {
            var idx = parseInt(this.getAttribute('data-pi'), 10);
            veilSolvePhrase(idx);
        });
    }

    var solveInputs = document.querySelectorAll('.veil-phrase-input input');
    for (var si = 0; si < solveInputs.length; si++) {
        solveInputs[si].addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                var idx = parseInt(this.getAttribute('data-pi'), 10);
                veilSolvePhrase(idx);
            }
        });
    }

    document.getElementById('veil-giveup').addEventListener('click', function () {
        giveUpGame('veil', p.phrases.join('<br>'));
    });

    if (allSolved) {
        var timePen = Math.min(20, Math.floor(state.elapsed / 15));
        var finalScore = gs.score - timePen;
        setTimeout(function () {
            showResults('veil', finalScore, [
                { value: formatTime(state.elapsed), label: 'Time' },
                { value: String(solvedCount) + '/' + p.phrases.length, label: 'Solved' }
            ], p.phrases.join(' · '));
        }, 500);
    }
}

function veilGuessLetter(letter) {
    if (gs.revealedLetters[letter] || gs.wrongLetters[letter]) return;
    if (gs.correctLetters[letter]) {
        gs.revealedLetters[letter] = true;
        gs.score -= 1;
        checkVeilAutoCascade();
    } else {
        gs.wrongLetters[letter] = true;
        gs.score -= 4;
        showToast(letter + ' is not in any phrase', 'error');
    }
    renderVeil();
}

function veilSolvePhrase(idx) {
    var p = PUZZLES.veil[state.currentDay];
    if (gs.solvedPhrases[idx]) return;
    var inp = document.querySelector('.veil-phrase-input input[data-pi="' + idx + '"]');
    if (!inp) return;
    var guess = inp.value.trim().toUpperCase().replace(/[^A-Z ]/g, '').replace(/\s+/g, ' ');
    var target = p.phrases[idx].toUpperCase();
    if (!guess) return;

    if (guess === target || guess === target.replace(/ /g, '')) {
        gs.solvedPhrases[idx] = true;
        gs.score += 5;
        showToast('Correct!', 'success');
        for (var i = 0; i < target.length; i++) {
            var ch = target[i];
            if (ch >= 'A' && ch <= 'Z') gs.revealedLetters[ch] = true;
        }
        checkVeilAutoCascade();
        renderVeil();
    } else {
        gs.score -= 3;
        showToast('Wrong guess', 'error');
        inp.value = '';
        renderVeil();
    }
}

function checkVeilAutoCascade() {
    var p = PUZZLES.veil[state.currentDay];
    for (var i = 0; i < p.phrases.length; i++) {
        if (gs.solvedPhrases[i]) continue;
        var phrase = p.phrases[i];
        var allRevealed = true;
        for (var j = 0; j < phrase.length; j++) {
            var ch = phrase[j];
            if (ch >= 'A' && ch <= 'Z' && !gs.revealedLetters[ch]) { allRevealed = false; break; }
        }
        if (allRevealed) {
            gs.solvedPhrases[i] = true;
            gs.score += 2;
        }
    }
}

/* ============================================================
   ECHO
   ============================================================ */

function initEcho() {
    var p = PUZZLES.echo[state.currentDay];
    var letterPositions = [];
    for (var i = 0; i < p.answer.length; i++) {
        if (p.answer[i] !== ' ') letterPositions.push(i);
    }
    gs = {
        revealed: {},
        revealIdx: 0,
        wrongGuesses: 0,
        letterPositions: letterPositions,
        totalLetters: letterPositions.length
    };
    renderEcho();
    startTimer();
    gs.echoInterval = setInterval(function () {
        if (gs.revealIdx < p.revealOrder.length) {
            var pos = letterPositions[p.revealOrder[gs.revealIdx]];
            if (pos !== undefined) gs.revealed[pos] = true;
            gs.revealIdx++;
            renderEcho();
        } else {
            clearInterval(gs.echoInterval);
            gs.echoInterval = null;
        }
    }, 3500);
}

function renderEcho() {
    var p = PUZZLES.echo[state.currentDay];
    var words = p.answer.split(' ');
    var displayHtml = '<div class="echo-display">';
    var pos = 0;
    for (var w = 0; w < words.length; w++) {
        displayHtml += '<div class="word-group">';
        for (var c = 0; c < words[w].length; c++) {
            var isRevealed = gs.revealed[pos];
            displayHtml += '<div class="echo-cell ' + (isRevealed ? 'revealed' : 'blank') + '">' + words[w][c] + '</div>';
            pos++;
        }
        displayHtml += '</div>';
        pos++;
    }
    displayHtml += '</div>';

    var revealedCount = Object.keys(gs.revealed).length;
    var pct = Math.round((revealedCount / gs.totalLetters) * 100);
    var progressHtml = '<div class="echo-progress-bar">' +
        '<div class="echo-progress-track"><div class="echo-progress-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="echo-progress-text">' + revealedCount + ' / ' + gs.totalLetters + ' letters revealed</div>' +
    '</div>';

    var scorePrev = Math.max(0, Math.round(100 - (revealedCount / gs.totalLetters) * 60 - gs.wrongGuesses * 15));
    var scoreHtml = '<div class="echo-score-preview">Potential score: ~' + scorePrev + '</div>';

    var inner = '<div class="game-panel">' +
        '<p class="instructions" style="text-align:center;margin-bottom:16px;">Letters appear one at a time. Guess the phrase before it\'s fully revealed! Wrong guesses instantly reveal 2 extra letters.</p>' +
        '<div class="veil-category-bar"><div class="label">Category</div><div class="value">' + p.category + '</div></div>' +
        displayHtml +
        progressHtml +
        scoreHtml +
        '<div class="input-row"><input type="text" class="text-input input-echo" id="echo-input" placeholder="Type your guess…" autocomplete="off"></div>' +
        '<div class="game-actions">' +
            '<button class="btn btn-echo" id="echo-submit">Submit</button>' +
            '<button class="btn btn-giveup" id="echo-giveup">Give Up</button>' +
        '</div>' +
    '</div>';

    document.getElementById('app').innerHTML = gameChrome('echo', inner);
    bindBack();

    document.getElementById('echo-submit').addEventListener('click', checkEcho);
    var inp = document.getElementById('echo-input');
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') checkEcho(); });
    document.getElementById('echo-giveup').addEventListener('click', function () {
        giveUpGame('echo', p.answer);
    });
    inp.focus();
}

function checkEcho() {
    var p = PUZZLES.echo[state.currentDay];
    var inp = document.getElementById('echo-input');
    var guess = inp.value.trim().toUpperCase().replace(/[^A-Z]/g, '');
    var target = p.answer.replace(/[^A-Z]/g, '');
    if (!guess) return;

    if (guess === target) {
        var revealedCount = Object.keys(gs.revealed).length;
        var revealPen = (revealedCount / gs.totalLetters) * 60;
        var wrongPen = gs.wrongGuesses * 15;
        var score = 100 - revealPen - wrongPen;
        showResults('echo', score, [
            { value: formatTime(state.elapsed), label: 'Time' },
            { value: revealedCount + '/' + gs.totalLetters, label: 'Revealed' },
            { value: String(gs.wrongGuesses), label: 'Wrong' }
        ], p.answer);
        return;
    }

    gs.wrongGuesses++;
    for (var pen = 0; pen < 2; pen++) {
        if (gs.revealIdx < p.revealOrder.length) {
            var pos = gs.letterPositions[p.revealOrder[gs.revealIdx]];
            if (pos !== undefined) gs.revealed[pos] = true;
            gs.revealIdx++;
        }
    }
    showToast('Wrong — 2 extra letters revealed', 'error');
    inp.value = '';
    renderEcho();
}

/* ============================================================
   FRAGMENTS
   ============================================================ */

function initFragments() {
    var p = PUZZLES.fragments[state.currentDay];
    var allTiles = shuffle(p.fragments.concat(p.decoys));
    gs = {
        pool: allTiles.map(function (t, i) { return { text: t, idx: i, used: false, eliminated: false, locked: false }; }),
        assembly: [],
        wrongGuesses: 0
    };
    renderFragments();
    startTimer();
}

function renderFragments() {
    var p = PUZZLES.fragments[state.currentDay];

    var poolHtml = '<div class="fragments-pool">';
    for (var i = 0; i < gs.pool.length; i++) {
        var t = gs.pool[i];
        var cls = 'frag-tile';
        if (t.eliminated) cls += ' eliminated';
        else if (t.used) cls += ' used';
        else if (t.locked) cls += ' locked';
        else cls += ' in-pool';
        poolHtml += '<div class="' + cls + '" data-pi="' + i + '">' + t.text + '</div>';
    }
    poolHtml += '</div>';

    var assemblyHtml = '<div class="fragments-assembly">';
    for (var a = 0; a < gs.assembly.length; a++) {
        var tile = gs.assembly[a];
        var isLocked = tile.locked;
        assemblyHtml += '<div class="frag-tile' + (isLocked ? ' locked' : '') + '" data-ai="' + a + '">' + tile.text + '</div>';
    }
    if (gs.assembly.length === 0) assemblyHtml += '<span style="color:var(--text-light);font-size:14px;">Click tiles to build the phrase</span>';
    assemblyHtml += '</div>';

    var assembled = gs.assembly.map(function (t) { return t.text; }).join('');
    var wordHtml = '<div class="fragments-assembled-word">' + (assembled || '…') + '</div>';

    var infoHtml = '<div class="fragments-info">';
    infoHtml += '<p class="reveal" style="margin-bottom:8px;">Category: ' + p.category + '</p>';
    if (gs.wrongGuesses >= 2 && p.fragments.length > 0) {
        infoHtml += '<p>First fragment: <span class="reveal">' + p.fragments[0] + '</span></p>';
    }
    if (gs.wrongGuesses >= 3 && p.fragments.length > 1) {
        infoHtml += '<p>Second fragment: <span class="reveal">' + p.fragments[1] + '</span></p>';
    }
    infoHtml += '</div>';

    var inner = '<div class="game-panel">' +
        '<p class="instructions" style="text-align:center;margin-bottom:16px;">Arrange the 2-letter tiles into a phrase. Some tiles are decoys. Wrong guesses eliminate a decoy and may lock correct tiles in place.</p>' +
        infoHtml +
        poolHtml +
        '<div class="fragments-assembly-label">Your Assembly</div>' +
        assemblyHtml +
        wordHtml +
        '<div class="game-actions">' +
            '<button class="btn btn-fragments" id="frag-submit">Submit</button>' +
            '<button class="btn btn-outline btn-sm" id="frag-clear">Clear</button>' +
            '<button class="btn btn-giveup" id="frag-giveup">Give Up</button>' +
        '</div>' +
    '</div>';

    document.getElementById('app').innerHTML = gameChrome('fragments', inner);
    bindBack();

    var poolTiles = document.querySelectorAll('.frag-tile.in-pool');
    for (var pt = 0; pt < poolTiles.length; pt++) {
        poolTiles[pt].addEventListener('click', function () {
            var idx = parseInt(this.getAttribute('data-pi'), 10);
            gs.pool[idx].used = true;
            gs.assembly.push({ text: gs.pool[idx].text, poolIdx: idx, locked: gs.pool[idx].locked });
            renderFragments();
        });
    }

    var asmTiles = document.querySelectorAll('.fragments-assembly .frag-tile:not(.locked)');
    for (var at = 0; at < asmTiles.length; at++) {
        asmTiles[at].addEventListener('click', function () {
            var idx = parseInt(this.getAttribute('data-ai'), 10);
            var tile = gs.assembly[idx];
            if (tile.locked) return;
            gs.pool[tile.poolIdx].used = false;
            gs.assembly.splice(idx, 1);
            renderFragments();
        });
    }

    document.getElementById('frag-submit').addEventListener('click', checkFragments);
    document.getElementById('frag-clear').addEventListener('click', function () {
        for (var i = gs.assembly.length - 1; i >= 0; i--) {
            if (!gs.assembly[i].locked) {
                gs.pool[gs.assembly[i].poolIdx].used = false;
                gs.assembly.splice(i, 1);
            }
        }
        renderFragments();
    });
    document.getElementById('frag-giveup').addEventListener('click', function () {
        giveUpGame('fragments', p.answer);
    });
}

function checkFragments() {
    var p = PUZZLES.fragments[state.currentDay];
    var assembled = gs.assembly.map(function (t) { return t.text; }).join('');
    if (assembled.length === 0) return;

    if (assembled === p.answerNoSpaces) {
        var timePen = Math.min(30, Math.floor(state.elapsed / 10));
        var wrongPen = gs.wrongGuesses * 10;
        var score = 100 - timePen - wrongPen;
        showResults('fragments', score, [
            { value: formatTime(state.elapsed), label: 'Time' },
            { value: String(gs.wrongGuesses), label: 'Wrong' }
        ], p.answer);
        return;
    }

    gs.wrongGuesses++;
    fragEliminateDecoy();

    if (gs.wrongGuesses === 2) {
        fragLockFirst(0);
    } else if (gs.wrongGuesses === 3) {
        fragLockFirst(1);
    }

    showToast('Wrong — a decoy has been eliminated', 'error');

    for (var i = gs.assembly.length - 1; i >= 0; i--) {
        if (!gs.assembly[i].locked) {
            gs.pool[gs.assembly[i].poolIdx].used = false;
            gs.assembly.splice(i, 1);
        }
    }
    renderFragments();
}

function fragEliminateDecoy() {
    var p = PUZZLES.fragments[state.currentDay];
    for (var i = 0; i < gs.pool.length; i++) {
        if (!gs.pool[i].eliminated && !gs.pool[i].used && p.decoys.indexOf(gs.pool[i].text) !== -1) {
            gs.pool[i].eliminated = true;
            return;
        }
    }
}

function fragLockFirst(fragIdx) {
    var p = PUZZLES.fragments[state.currentDay];
    if (fragIdx >= p.fragments.length) return;
    var target = p.fragments[fragIdx];
    for (var i = 0; i < gs.pool.length; i++) {
        if (gs.pool[i].text === target && !gs.pool[i].eliminated) {
            gs.pool[i].locked = true;
            gs.pool[i].used = true;
            var alreadyInAssembly = false;
            for (var a = 0; a < gs.assembly.length; a++) {
                if (gs.assembly[a].poolIdx === i) { alreadyInAssembly = true; gs.assembly[a].locked = true; break; }
            }
            if (!alreadyInAssembly) {
                gs.assembly.splice(fragIdx, 0, { text: target, poolIdx: i, locked: true });
            }
            return;
        }
    }
}

/* ============================================================
   BOOT
   ============================================================ */

init();

})();
