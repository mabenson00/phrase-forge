(function () {
'use strict';

/* ============================================================
   CONSTANTS
   ============================================================ */

var LAUNCH_DATE = new Date(2026, 1, 17);

var GAME_META = {
    bridges: { icon: '🌉', title: 'Bridges',  tagline: 'Find the word that connects two phrases', color: 'bridges' },
    veil:    { icon: '🎭', title: 'Veil',     tagline: 'Reveal hidden phrases letter by letter',  color: 'veil'    },
    echo:    { icon: '📡', title: 'Echo',     tagline: 'Guess the phrase before it fully appears', color: 'echo'    }
};

var GAME_ORDER = ['bridges', 'veil', 'echo'];

/* ============================================================
   PUZZLE DATA — 7 per game
   ============================================================ */

var PUZZLES = {

    /* ---------- BRIDGES ----------
       cat1 clues the full left phrase (phrase1 + bridge)
       cat2 clues the full right phrase (bridge + phrase2)  */
    bridges: [
        {
            phrase1: 'THUNDER', phrase2: 'TROOPER', bridge: 'STORM',
            fullPhrase1: 'THUNDERSTORM', fullPhrase2: 'STORMTROOPER',
            cat1: "When Zeus throws a tantrum",
            cat2: "White-armored galactic infantry",
            revealOrder1: [2, 4, 1, 3, 6, 5, 0],
            revealOrder2: [4, 2, 3, 1, 6, 5, 0]
        },
        {
            phrase1: 'BREAK', phrase2: 'FOOD', bridge: 'FAST',
            fullPhrase1: 'BREAKFAST', fullPhrase2: 'FAST FOOD',
            cat1: "The meal that ends your nightly hunger strike",
            cat2: "Drive-through dinner",
            revealOrder1: [4, 0, 1, 2, 3],
            revealOrder2: [0, 3, 1, 2]
        },
        {
            phrase1: 'FIRE', phrase2: 'OUT', bridge: 'WORK',
            fullPhrase1: 'FIREWORK', fullPhrase2: 'WORKOUT',
            cat1: "Katy Perry hit or July 4th spectacle",
            cat2: "Why you're sore on Tuesday",
            revealOrder1: [0, 1, 2, 3],
            revealOrder2: [1, 0, 2]
        },
        {
            phrase1: 'BLACK', phrase2: 'CAGE', bridge: 'BIRD',
            fullPhrase1: 'BLACKBIRD', fullPhrase2: 'BIRDCAGE',
            cat1: "Paul McCartney's dark flier",
            cat2: "Robin Williams in drag, essentially",
            revealOrder1: [4, 0, 3, 1, 2],
            revealOrder2: [2, 0, 1, 3]
        },
        {
            phrase1: 'HEAD', phrase2: 'WIDTH', bridge: 'BAND',
            fullPhrase1: 'HEADBAND', fullPhrase2: 'BANDWIDTH',
            cat1: "Jazzercise essential from the '80s",
            cat2: "What your ISP is always throttling",
            revealOrder1: [3, 0, 1, 2],
            revealOrder2: [0, 2, 4, 1, 3]
        },
        {
            phrase1: 'MOON', phrase2: 'HOUSE', bridge: 'LIGHT',
            fullPhrase1: 'MOONLIGHT', fullPhrase2: 'LIGHTHOUSE',
            cat1: "2017 Best Picture envelope mix-up winner",
            cat2: "Coastal tower that guides sailors home",
            revealOrder1: [0, 3, 1, 2],
            revealOrder2: [0, 2, 3, 1, 4]
        },
        {
            phrase1: 'BACK', phrase2: 'FLY', bridge: 'FIRE',
            fullPhrase1: 'BACKFIRE', fullPhrase2: 'FIREFLY',
            cat1: "When a scheme explodes in your face",
            cat2: "Whedon's one-season space western",
            revealOrder1: [3, 0, 2, 1],
            revealOrder2: [2, 0, 1]
        }
    ],

    /* ---------- VEIL ----------
       Clues are cryptic hints, not direct category labels */
    veil: [
        {
            clue: "Canvases worth more than most buildings",
            phrases: ['STARRY NIGHT', 'THE SCREAM', 'GUERNICA', 'MONA LISA', 'WATER LILIES']
        },
        {
            clue: "Animated tales that launched a thousand lunchboxes",
            phrases: ['FROZEN', 'THE LION KING', 'ALADDIN', 'MULAN', 'FINDING NEMO']
        },
        {
            clue: "Five dots where world leaders hang their hats",
            phrases: ['TOKYO', 'LONDON', 'PARIS', 'CAIRO', 'BUENOS AIRES']
        },
        {
            clue: "You'd learn these in Buenos Aires, Vienna, or Seville",
            phrases: ['BALLET', 'SALSA', 'TANGO', 'WALTZ', 'FLAMENCO']
        },
        {
            clue: "The Globe Theatre's most performed tragedies and tales",
            phrases: ['HAMLET', 'OTHELLO', 'MACBETH', 'THE TEMPEST', 'ROMEO AND JULIET']
        },
        {
            clue: "Summer Games events with very different uniforms",
            phrases: ['GYMNASTICS', 'FENCING', 'ARCHERY', 'TRIATHLON', 'WATER POLO']
        },
        {
            clue: "NASA gave them names before sending them skyward",
            phrases: ['APOLLO', 'GEMINI', 'VOYAGER', 'CHALLENGER', 'DISCOVERY']
        }
    ],

    /* ---------- ECHO ----------
       Clues are cryptic crossword-style hints */
    echo: [
        {
            answer: 'BOHEMIAN RHAPSODY',
            clue: "Queen's six-minute opus that defied every radio convention",
            revealOrder: [15, 14, 11, 0, 4, 8, 12, 2, 9, 7, 5, 6, 10, 1, 13, 3]
        },
        {
            answer: 'JURASSIC PARK',
            clue: "1993 blockbuster where DNA brought the past roaring back",
            revealOrder: [11, 0, 6, 8, 1, 5, 3, 4, 2, 10, 7, 9]
        },
        {
            answer: 'STAIRWAY TO HEAVEN',
            clue: "Eight-minute prog-rock epic allegedly banned from guitar shops",
            revealOrder: [5, 7, 13, 10, 15, 3, 4, 0, 1, 8, 9, 2, 6, 12, 11, 14]
        },
        {
            answer: 'GONE WITH THE WIND',
            clue: "Frankly my dear, this saga is nearly four hours long",
            revealOrder: [14, 0, 4, 11, 7, 9, 6, 8, 2, 13, 5, 12, 1, 3, 10]
        },
        {
            answer: 'THUNDERSTRUCK',
            clue: "Angus Young's opening riff that electrifies arenas worldwide",
            revealOrder: [12, 11, 4, 2, 10, 1, 7, 3, 0, 8, 6, 9, 5]
        },
        {
            answer: 'YELLOW SUBMARINE',
            clue: "Fab Four's animated adventure beneath the waves",
            revealOrder: [0, 5, 8, 9, 7, 11, 13, 12, 6, 2, 3, 10, 4, 1, 14]
        },
        {
            answer: 'IMAGINE DRAGONS',
            clue: "'Radioactive' hitmakers out of Las Vegas",
            revealOrder: [7, 1, 13, 11, 8, 3, 10, 5, 12, 0, 4, 2, 9, 6]
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
        var raw = localStorage.getItem('pf_scores_v3');
        if (raw) state.scores = JSON.parse(raw);
    } catch (e) { state.scores = {}; }
}

function saveScores() {
    try { localStorage.setItem('pf_scores_v3', JSON.stringify(state.scores)); } catch (e) {}
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
    var fn = { bridges: initBridges, veil: initVeil, echo: initEcho };
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
    gs = { wrongGuesses: 0, revealStep: 0, side1Solved: false, side2Solved: false };
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
        '<p class="instructions">Two phrases share a hidden bridge word. Guess the bridge word, or guess either side phrase to reveal it for free. Wrong guesses reveal a letter.</p>' +
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
        '<p class="instructions" style="text-align:center;margin-bottom:16px;">Five hidden phrases share a theme. Reveal letters with the alphabet, then solve the phrases. Correct letters cost 1 pt. Wrong letters cost 4.</p>' +
        '<div class="veil-category-bar"><div class="label">Clue</div><div class="value">' + p.clue + '</div></div>' +
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
        }
    }
}

/* ============================================================
   ECHO
   The key fix: the auto-reveal interval only updates the
   display cells and progress bar — it never touches the input.
   Full re-render only happens on init and wrong guesses.
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
            updateEchoDisplay();
        } else {
            clearInterval(gs.echoInterval);
            gs.echoInterval = null;
        }
    }, 3500);
}

function renderEcho() {
    var p = PUZZLES.echo[state.currentDay];
    var words = p.answer.split(' ');
    var displayHtml = '<div id="echo-cells" class="echo-display">';
    var pos = 0;
    for (var w = 0; w < words.length; w++) {
        displayHtml += '<div class="word-group">';
        for (var c = 0; c < words[w].length; c++) {
            var isRevealed = gs.revealed[pos];
            displayHtml += '<div class="echo-cell ' + (isRevealed ? 'revealed' : 'blank') + '" data-pos="' + pos + '">' + words[w][c] + '</div>';
            pos++;
        }
        displayHtml += '</div>';
        pos++;
    }
    displayHtml += '</div>';

    var revealedCount = Object.keys(gs.revealed).length;
    var pct = Math.round((revealedCount / gs.totalLetters) * 100);
    var progressHtml = '<div class="echo-progress-bar">' +
        '<div class="echo-progress-track"><div class="echo-progress-fill" id="echo-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="echo-progress-text" id="echo-prog-text">' + revealedCount + ' / ' + gs.totalLetters + ' letters revealed</div>' +
    '</div>';

    var scorePrev = Math.max(0, Math.round(100 - (revealedCount / gs.totalLetters) * 60 - gs.wrongGuesses * 15));
    var scoreHtml = '<div class="echo-score-preview" id="echo-score-prev">Potential score: ~' + scorePrev + '</div>';

    var inner = '<div class="game-panel">' +
        '<p class="instructions" style="text-align:center;margin-bottom:16px;">Letters appear one at a time. Guess the phrase before it\'s fully revealed! Wrong guesses instantly reveal 2 extra letters.</p>' +
        '<div class="veil-category-bar"><div class="label">Clue</div><div class="value">' + p.clue + '</div></div>' +
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

function updateEchoDisplay() {
    var cells = document.querySelectorAll('#echo-cells .echo-cell');
    for (var i = 0; i < cells.length; i++) {
        var pos = parseInt(cells[i].getAttribute('data-pos'), 10);
        if (gs.revealed[pos] && cells[i].className.indexOf('revealed') === -1) {
            cells[i].className = 'echo-cell revealed';
        }
    }

    var revealedCount = Object.keys(gs.revealed).length;
    var pct = Math.round((revealedCount / gs.totalLetters) * 100);
    var fill = document.getElementById('echo-fill');
    if (fill) fill.style.width = pct + '%';
    var progText = document.getElementById('echo-prog-text');
    if (progText) progText.textContent = revealedCount + ' / ' + gs.totalLetters + ' letters revealed';
    var scoreEl = document.getElementById('echo-score-prev');
    if (scoreEl) {
        var scorePrev = Math.max(0, Math.round(100 - (revealedCount / gs.totalLetters) * 60 - gs.wrongGuesses * 15));
        scoreEl.textContent = 'Potential score: ~' + scorePrev;
    }
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
    var p2 = PUZZLES.echo[state.currentDay];
    for (var pen = 0; pen < 2; pen++) {
        if (gs.revealIdx < p2.revealOrder.length) {
            var pos = gs.letterPositions[p2.revealOrder[gs.revealIdx]];
            if (pos !== undefined) gs.revealed[pos] = true;
            gs.revealIdx++;
        }
    }
    showToast('Wrong — 2 extra letters revealed', 'error');
    var savedVal = inp.value;
    renderEcho();
    var newInp = document.getElementById('echo-input');
    if (newInp) { newInp.value = savedVal; newInp.focus(); }
}

/* ============================================================
   BOOT
   ============================================================ */

init();

})();
