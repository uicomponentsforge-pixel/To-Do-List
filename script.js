(() => {
  const STORAGE_KEY = 'todo.tasks.v1';

  const form = document.getElementById('add-form');
  const input = document.getElementById('task-input');
  const listEl = document.getElementById('list');
  const emptyEl = document.getElementById('empty');
  const countEl = document.getElementById('count');
  const filtersEl = document.getElementById('filters');
  const clearBtn = document.getElementById('clear-done');

  // ---------- State: an array of { id, text, done } ----------
  let tasks = load();
  let filter = 'all';

  // ---------- localStorage ----------
  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* storage full or blocked: the app still works for this session */
    }
  }

  // ---------- Actions ----------
  function addTask(text) {
    tasks.push({ id: Date.now() + Math.random(), text, done: false });
    save();
    render();
  }

  function toggleTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (task) task.done = !task.done;
    save();
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    save();
    render();
  }

  function clearCompleted() {
    tasks = tasks.filter((t) => !t.done);
    save();
    render();
  }

  // ---------- Rendering ----------
  function visibleTasks() {
    if (filter === 'active') return tasks.filter((t) => !t.done);
    if (filter === 'completed') return tasks.filter((t) => t.done);
    return tasks;
  }

  function createItem(task) {
    const li = document.createElement('li');
    li.className = 'item' + (task.done ? ' done' : '');
    li.dataset.id = task.id;

    const check = document.createElement('button');
    check.type = 'button';
    check.className = 'check';
    check.dataset.action = 'toggle';
    check.setAttribute('role', 'checkbox');
    check.setAttribute('aria-checked', String(task.done));
    check.setAttribute('aria-label', `Mark "${task.text}" as ${task.done ? 'active' : 'completed'}`);
    check.textContent = task.done ? '✓' : '';

    const text = document.createElement('span');
    text.className = 'text';
    text.textContent = task.text; // textContent keeps user input safe from HTML injection

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'delete';
    del.dataset.action = 'delete';
    del.setAttribute('aria-label', `Delete "${task.text}"`);
    del.textContent = '×';

    li.append(check, text, del);
    return li;
  }

  function render() {
    listEl.replaceChildren(...visibleTasks().map(createItem));

    const left = tasks.filter((t) => !t.done).length;
    countEl.textContent = `${left} ${left === 1 ? 'task' : 'tasks'} left`;
    clearBtn.hidden = !tasks.some((t) => t.done);

    const messages = {
      all: 'No tasks yet. Add one above.',
      active: 'Nothing left to do.',
      completed: 'No completed tasks yet.',
    };
    emptyEl.hidden = listEl.children.length > 0;
    emptyEl.textContent = messages[filter];

    filtersEl.querySelectorAll('.filter').forEach((btn) => {
      const on = btn.dataset.filter === filter;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  }

  // ---------- Events ----------
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addTask(text);
    input.value = '';
    input.focus();
  });

  // One listener handles every toggle and delete button (event delegation)
  listEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const id = Number(btn.closest('.item').dataset.id);
    if (btn.dataset.action === 'toggle') toggleTask(id);
    if (btn.dataset.action === 'delete') deleteTask(id);
  });

  filtersEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    filter = btn.dataset.filter;
    render();
  });

  clearBtn.addEventListener('click', clearCompleted);

  render();
})();
