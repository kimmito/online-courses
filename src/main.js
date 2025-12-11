import './styles/main.scss';
import coursesData from './data/courses.json';

const state = {
  allCourses: coursesData,
  filteredCourses: coursesData,
  currentCategory: 'All',
  searchQuery: '',
  visibleCount: 9
};

const navList = document.querySelector('.navigation__list');
const searchInput = document.querySelector('.navigation__search');
const coursesGrid = document.querySelector('.courses__grid__list');
const loadMoreBtn = document.querySelector('.courses__load-more__button');

const tagColors = {
  'marketing': '#03CEA4',
  'management': '#5A87FC',
  'hr-recruiting': '#F89828',
  'design': '#F52F6E',
  'development': '#7772F1'
};

function renderCourseCard(course) {
  const categoryClass = course.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const tagColor = tagColors[categoryClass] || '#ccc';
  return `
    <li class="courses__grid__item courses__card">
      <img src="${course.image}" alt="${course.alt}" class="courses__card__image" loading="lazy">
      <div class="courses__card__desc">
        <ul class="courses__card__desc__tags-list">
          <li class="courses__card__desc__tags-item" style="background-color: ${tagColor};">${course.category}</li>
        </ul>
        <h3 class="courses__card__desc__title">${course.title}</h3>
        <div class="courses__card__desc__footer">
          <span class="courses__card__desc__footer__price">$${course.price}</span>
          <span class="courses__card__desc__footer__author">| by ${course.author}</span>
        </div>
      </div>
    </li>
  `;
}

function renderCourses() {
  const visibleCourses = state.filteredCourses.slice(0, state.visibleCount);
  coursesGrid.innerHTML = visibleCourses.map(renderCourseCard).join('');
  loadMoreBtn.style.display = state.visibleCount < state.filteredCourses.length ? 'block' : 'none';
}

function generateCategories() {
  const categories = ['All', ...new Set(state.allCourses.map(c => c.category))];
  navList.innerHTML = categories.map(cat => {
    const count = cat === 'All' ? state.allCourses.length : state.allCourses.filter(c => c.category === cat).length;
    return `<li class="navigation__item ${cat === state.currentCategory ? 'active' : ''}" data-category="${cat}">${cat} <span class="navigation__count">${count}</span></li>`;
  }).join('');
}

function filterCourses() {
  state.filteredCourses = state.allCourses.filter(course => {
    const matchesCategory = state.currentCategory === 'All' || course.category === state.currentCategory;
    const matchesSearch = course.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                          course.author.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  state.visibleCount = 9;
  renderCourses();
}

navList.addEventListener('click', (e) => {
  if (e.target.classList.contains('navigation__item')) {
    state.currentCategory = e.target.dataset.category;
    document.querySelectorAll('.navigation__item').forEach(item => item.classList.remove('active'));
    e.target.classList.add('active');
    filterCourses();
  }
});

searchInput.addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
  filterCourses();
});

loadMoreBtn.addEventListener('click', () => {
  state.visibleCount += 6;
  renderCourses();
});

generateCategories();
renderCourses();

