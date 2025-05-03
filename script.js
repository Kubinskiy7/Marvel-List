const list = document.getElementById('project-list');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close-modal');
const search = document.getElementById('search');
const themeToggle = document.getElementById('theme-toggle');

let data = [];

fetch('projects.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    renderList();
  });

function renderList() {
  list.innerHTML = '';
  let lastSection = '';

  data.forEach(project => {
    if (project.section !== lastSection) {
      const sectionTitle = document.createElement('h2');
      sectionTitle.className = 'section-title';
      sectionTitle.textContent = project.section;
      list.appendChild(sectionTitle);
      lastSection = project.section;
    }

    const card = document.createElement('div');
    card.className = 'project-card';
    card.textContent = `${project.title} (${new Date(project.date).getFullYear()})`;
    card.dataset.id = project.id;
    card.onclick = () => openModal(project);
    list.appendChild(card);
  });
}

function openModal(project) {
  modal.classList.remove('hidden');
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-date').textContent = `Дата выхода: ${project.date}`;
  document.getElementById('modal-directors').textContent = `Режиссёр: ${project.directors}`;
  document.getElementById('modal-duration').textContent = `Длительность: ${project.duration}`;
  document.getElementById('modal-rating').textContent = `IMDb: ${project.imdb} | Кинопоиск: ${project.kinopoisk}`;
  document.getElementById('modal-link').href = project.link;
}

closeBtn.onclick = () => modal.classList.add('hidden');

search.addEventListener('input', e => {
  const value = e.target.value.toLowerCase();
  const card = Array.from(document.getElementsByClassName('project-card'))
    .find(el => el.textContent.toLowerCase().includes(value));
  if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

themeToggle.onclick = () => {
  const html = document.documentElement;
  const newTheme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  html.dataset.theme = newTheme;
};

// Смена темы при старте по системной
window.addEventListener('DOMContentLoaded', () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
});
