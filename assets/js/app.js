'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const CIRCUMFERENCE = 2 * Math.PI * 83; // SVG r=83

  /* ── localStorage helpers ────────────────────────────────── */
  const store = {
    get:    (k, fallback) => { try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : fallback; } catch { return fallback; } },
    set:    (k, v) => localStorage.setItem(k, JSON.stringify(v)),
    remove: (k)    => localStorage.removeItem(k),
  };

  /* ── Sound options ───────────────────────────────────────── */
  const SOUND_OPTIONS = [
    { file: '鳩時計.mp3',         key: 'sound_hato' },
    { file: 'ニワトリの鳴き声.mp3', key: 'sound_niwatori' },
    { file: '犬の鳴き声.mp3',      key: 'sound_inu' },
    { file: '猫の鳴き声.mp3',      key: 'sound_neko' },
  ];

  /* ── Initial state ───────────────────────────────────────── */
  const settings = store.get('bp_settings', {
    pomodoro: 25, short: 5, long: 15, longInterval: 4,
    autoBreak: false, autoPomo: false,
    volume: 80, endSound: '鳩時計.mp3',
  });
  // migrate older saves that lack sound keys
  if (settings.volume   === undefined) settings.volume   = 80;
  if (!settings.endSound)              settings.endSound  = '鳩時計.mp3';

  let todos = store.get('bp_todos', []);

  const state = {
    mode:       'pomodoro',
    running:    false,
    remaining:  settings.pomodoro * 60,
    total:      settings.pomodoro * 60,
    sessions:   store.get('bp_sessions', 0),
    activeTodo: localStorage.getItem('bp_active') || null,
    timerId:    null,
  };

  /* ── DOM refs ────────────────────────────────────────────── */
  const timerDisplay    = document.getElementById('timerDisplay');
  const modeLabel       = document.getElementById('modeLabel');
  const ringProgress    = document.getElementById('ringProgress');
  const startBtn        = document.getElementById('startBtn');
  const resetBtn        = document.getElementById('resetBtn');
  const skipBtn         = document.getElementById('skipBtn');
  const sessionDots     = document.getElementById('sessionDots');
  const sessionCount    = document.getElementById('sessionCount');
  const resetSessionBtn = document.getElementById('resetSessionBtn');
  const settingsToggle  = document.getElementById('settingsToggle');
  const settingsPanel   = document.getElementById('settingsPanel');
  const todoInput       = document.getElementById('todoInput');
  const addTodoBtn      = document.getElementById('addTodoBtn');
  const todoList        = document.getElementById('todoList');
  const todoEmpty       = document.getElementById('todoEmpty');
  const clearDoneBtn    = document.getElementById('clearDoneBtn');
  const toast           = document.getElementById('toast');
  const setPomo         = document.getElementById('setPomo');
  const setShort        = document.getElementById('setShort');
  const setLong         = document.getElementById('setLong');
  const setLongInterval = document.getElementById('setLongInterval');
  const setAutoBreak    = document.getElementById('setAutoBreak');
  const setAutoPomo     = document.getElementById('setAutoPomo');
  const applySettingsBtn= document.getElementById('applySettings');
  const setVolume       = document.getElementById('setVolume');
  const volumeVal       = document.getElementById('volumeVal');
  const setEndSound     = document.getElementById('setEndSound');

  /* ── Audio ───────────────────────────────────────────────── */
  const startAudio = new Audio('assets/se/決定音.mp3');
  const endAudio   = new Audio();

  function playStartSound() {
    startAudio.currentTime = 0;
    startAudio.volume = settings.volume / 100;
    startAudio.play().catch(() => {});
  }

  function playEndSound() {
    endAudio.src = 'assets/se/' + settings.endSound;
    endAudio.currentTime = 0;
    endAudio.volume = settings.volume / 100;
    endAudio.play().catch(() => {});
  }

  /* ── Ring setup ──────────────────────────────────────────── */
  ringProgress.style.strokeDasharray  = CIRCUMFERENCE;
  ringProgress.style.strokeDashoffset = 0;

  /* ── Mode config ─────────────────────────────────────────── */
  const MODE_COLORS = { pomodoro: '#e05c5c', short: '#4caf7d', long: '#5b9bd5' };

  function getDuration(mode) {
    return { pomodoro: settings.pomodoro, short: settings.short, long: settings.long }[mode] * 60;
  }

  function applyModeColor(mode) {
    document.documentElement.style.setProperty('--mode-color', MODE_COLORS[mode]);
  }

  /* ── Timer display ───────────────────────────────────────── */
  function updateDisplay() {
    const m = String(Math.floor(state.remaining / 60)).padStart(2, '0');
    const s = String(state.remaining % 60).padStart(2, '0');
    timerDisplay.textContent = `${m}:${s}`;
  }

  function updateRing() {
    const ratio = state.total > 0 ? state.remaining / state.total : 1;
    ringProgress.style.strokeDashoffset = CIRCUMFERENCE * (1 - ratio);
  }

  function updateTitle() {
    const m = String(Math.floor(state.remaining / 60)).padStart(2, '0');
    const s = String(state.remaining % 60).padStart(2, '0');
    document.title = `${m}:${s} — ${I18n.t('label_' + state.mode)} | BaconPomodoro`;
  }

  function updateStartBtn() {
    if (state.running) {
      startBtn.textContent = I18n.t('btn_pause');
    } else if (state.remaining < getDuration(state.mode)) {
      startBtn.textContent = I18n.t('btn_resume');
    } else {
      startBtn.textContent = I18n.t('btn_start');
    }
  }

  /* ── Session UI ──────────────────────────────────────────── */
  function updateSessionUI() {
    const interval = settings.longInterval;
    const filled   = state.sessions % interval || (state.sessions > 0 && state.sessions % interval === 0 ? interval : 0);
    sessionDots.innerHTML = '';
    for (let i = 0; i < interval; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i < filled ? ' done' : '');
      sessionDots.appendChild(dot);
    }
    sessionCount.textContent = I18n.t('sessions_done').replace('{n}', state.sessions);
  }

  /* ── Mode switching ──────────────────────────────────────── */
  function switchMode(mode, reset = true) {
    state.mode = mode;
    if (reset) {
      clearInterval(state.timerId);
      state.running   = false;
      state.remaining = getDuration(mode);
      state.total     = state.remaining;
    }
    applyModeColor(mode);
    modeLabel.textContent = I18n.t('label_' + mode);
    document.querySelectorAll('.mode-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.mode === mode)
    );
    updateDisplay();
    updateRing();
    updateStartBtn();
  }

  /* ── Timer tick ──────────────────────────────────────────── */
  function tick() {
    if (state.remaining <= 0) {
      clearInterval(state.timerId);
      state.running = false;
      onComplete();
      return;
    }
    state.remaining--;
    updateDisplay();
    updateRing();
    updateTitle();
  }

  function toggleStart() {
    if (state.running) {
      clearInterval(state.timerId);
      state.running = false;
      document.title = 'BaconPomodoro';
    } else {
      playStartSound();
      state.timerId = setInterval(tick, 1000);
      state.running = true;
    }
    updateStartBtn();
  }

  function reset() {
    clearInterval(state.timerId);
    state.running   = false;
    state.remaining = getDuration(state.mode);
    state.total     = state.remaining;
    document.title  = 'BaconPomodoro';
    updateDisplay();
    updateRing();
    updateStartBtn();
  }

  function skip() {
    clearInterval(state.timerId);
    state.running = false;
    onComplete(true);
  }

  function onComplete(skipped = false) {
    document.title = 'BaconPomodoro';
    if (!skipped) playEndSound();

    if (state.mode === 'pomodoro' && !skipped) {
      state.sessions++;
      store.set('bp_sessions', state.sessions);
      updateSessionUI();
      showToast(I18n.t('toast_work_done'));
      notifyUser(I18n.t('notif_work_title'), I18n.t('notif_work_body'));
    } else if (state.mode !== 'pomodoro') {
      showToast(I18n.t('toast_break_done'));
      notifyUser(I18n.t('notif_break_title'), I18n.t('notif_break_body'));
    }

    const nextMode = resolveNextMode();
    const auto     = state.mode === 'pomodoro' ? settings.autoBreak : settings.autoPomo;
    switchMode(nextMode);

    if (auto) {
      setTimeout(() => {
        state.timerId = setInterval(tick, 1000);
        state.running = true;
        updateStartBtn();
      }, 500);
    }
  }

  function resolveNextMode() {
    if (state.mode !== 'pomodoro') return 'pomodoro';
    return (state.sessions > 0 && state.sessions % settings.longInterval === 0) ? 'long' : 'short';
  }

  /* ── Notifications ───────────────────────────────────────── */
  function notifyUser(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }

  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ── Settings ────────────────────────────────────────────── */
  function populateSoundSelect() {
    const current = settings.endSound;
    setEndSound.innerHTML = '';
    SOUND_OPTIONS.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt.file;
      o.textContent = I18n.t(opt.key);
      if (opt.file === current) o.selected = true;
      setEndSound.appendChild(o);
    });
  }

  function populateSettingsUI() {
    setPomo.value         = settings.pomodoro;
    setShort.value        = settings.short;
    setLong.value         = settings.long;
    setLongInterval.value = settings.longInterval;
    setAutoBreak.checked  = settings.autoBreak;
    setAutoPomo.checked   = settings.autoPomo;
    setVolume.value       = settings.volume;
    volumeVal.textContent = settings.volume;
    populateSoundSelect();
  }

  /* ── TODO rendering ──────────────────────────────────────── */
  function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
      const item = document.createElement('div');
      item.className = 'todo-item'
        + (todo.done ? ' done' : '')
        + (todo.id === state.activeTodo ? ' active-task' : '');

      const check = document.createElement('input');
      check.type = 'checkbox';
      check.className = 'todo-check';
      check.checked = todo.done;
      check.addEventListener('change', () => toggleDone(todo.id));

      const text = document.createElement('span');
      text.className = 'todo-text';
      text.textContent = todo.text;

      item.appendChild(check);
      item.appendChild(text);

      if (!todo.done) {
        const focusBtn = document.createElement('button');
        focusBtn.className = 'focus-btn';
        focusBtn.textContent = todo.id === state.activeTodo
          ? I18n.t('btn_focusing')
          : I18n.t('btn_focus');
        focusBtn.addEventListener('click', () => setActiveTodo(todo.id));
        item.appendChild(focusBtn);
      }

      const del = document.createElement('button');
      del.className = 'del-btn';
      del.textContent = '✕';
      del.addEventListener('click', () => deleteTodo(todo.id));
      item.appendChild(del);

      todoList.appendChild(item);
    });
    todoEmpty.style.display = todos.length === 0 ? 'block' : 'none';
  }

  function addTodo(text) {
    text = text.trim();
    if (!text) return;
    todos.unshift({ id: Date.now().toString(), text, done: false });
    store.set('bp_todos', todos);
    renderTodos();
    todoInput.value = '';
    addTodoBtn.classList.remove('visible');
  }

  function toggleDone(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    todo.done = !todo.done;
    if (todo.done && state.activeTodo === id) {
      state.activeTodo = null;
      store.remove('bp_active');
    }
    store.set('bp_todos', todos);
    renderTodos();
  }

  function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    if (state.activeTodo === id) {
      state.activeTodo = null;
      store.remove('bp_active');
    }
    store.set('bp_todos', todos);
    renderTodos();
  }

  function setActiveTodo(id) {
    state.activeTodo = (state.activeTodo === id) ? null : id;
    if (state.activeTodo) localStorage.setItem('bp_active', state.activeTodo);
    else store.remove('bp_active');
    renderTodos();
  }

  /* ── Event listeners ─────────────────────────────────────── */
  document.querySelectorAll('.mode-tab').forEach(tab =>
    tab.addEventListener('click', () => switchMode(tab.dataset.mode))
  );

  startBtn.addEventListener('click', toggleStart);
  resetBtn.addEventListener('click', reset);
  skipBtn.addEventListener('click', skip);

  resetSessionBtn.addEventListener('click', () => {
    if (!confirm(I18n.t('confirm_reset_session'))) return;
    state.sessions = 0;
    store.set('bp_sessions', 0);
    updateSessionUI();
    showToast(I18n.t('toast_session_reset'));
  });

  settingsToggle.addEventListener('click', () => {
    settingsToggle.classList.toggle('open');
    settingsPanel.classList.toggle('open');
  });

  applySettingsBtn.addEventListener('click', () => {
    settings.pomodoro     = Math.min(60, Math.max(1, parseInt(setPomo.value) || 25));
    settings.short        = Math.min(30, Math.max(1, parseInt(setShort.value) || 5));
    settings.long         = Math.min(60, Math.max(1, parseInt(setLong.value) || 15));
    settings.longInterval = Math.min(10, Math.max(2, parseInt(setLongInterval.value) || 4));
    settings.autoBreak    = setAutoBreak.checked;
    settings.autoPomo     = setAutoPomo.checked;
    settings.volume       = Math.min(100, Math.max(0, parseInt(setVolume.value) || 80));
    settings.endSound     = setEndSound.value || '鳩時計.mp3';
    store.set('bp_settings', settings);
    switchMode(state.mode);
    updateSessionUI();
    showToast(I18n.t('toast_settings_saved'));
  });

  // Volume display
  setVolume.addEventListener('input', () => {
    volumeVal.textContent = setVolume.value;
  });

  // + button visibility
  todoInput.addEventListener('input', () => {
    addTodoBtn.classList.toggle('visible', todoInput.value.trim().length > 0);
  });
  todoInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTodo(todoInput.value);
  });
  addTodoBtn.addEventListener('click', () => addTodo(todoInput.value));

  clearDoneBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.done);
    store.set('bp_todos', todos);
    renderTodos();
  });

  // Language change — update dynamic text
  document.addEventListener('bp:langchange', () => {
    modeLabel.textContent = I18n.t('label_' + state.mode);
    updateStartBtn();
    updateSessionUI();
    renderTodos();
    populateSoundSelect();
  });

  /* ── Boot ────────────────────────────────────────────────── */
  populateSettingsUI();
  switchMode('pomodoro');
  updateSessionUI();
  renderTodos();

  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }

}); // DOMContentLoaded
