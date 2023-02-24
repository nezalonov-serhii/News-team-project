import './refs/refs';
import './mobileMenu/mobileMenu';
import './mobileMenu/mobileMenuCurrent';
import './currentPage/currentPage';
import './darkMode/darkMode';
import { refs } from './refs/refs';
import Sprite from '../images/sprite.svg';

import { createNewsCard } from './markup/card';

import { btnAddToFavorite } from './favorite/addToFavorite';

init();

function init() {
  renderReadNews();
}

function renderReadNews() {
  let markup = '';

  const parsedNews = getDataFromLocalStorage('news');

  if (!parsedNews) {
    showErrorSearch();
    return;
  }
  const filteredNews = parsedNews.filter(news => news.read === true);

  if (filteredNews.length < 1) {
    showErrorSearch();
    return;
  }

  const dates = parsedNews.map(item => item.dayRead);

  if (dates.length < 1) {
    showErrorSearch();
  }

  const uniqDates = Array.from(new Set(dates));
  const filteredDate = uniqDates.filter(date => date !== undefined);

  const sortedDates = filteredDate.sort((a, b) => b.localeCompare(a));

  for (let i = 0; i < sortedDates.length; i += 1) {
    const filteredNews = parsedNews.filter(
      item => item.dayRead === sortedDates[i]
    );

    const cardMarkup = filteredNews.map(item => createNewsCard(item)).join('');

    markup += `<div class="read-news__list">
      <button class="read-news__btn js-read-news-btn">
        <span>${sortedDates[i]}</span>
        <svg><use href="${Sprite + '#arrow-down'}"></use></svg>
      </button>
      <ul class="news__lists">
        ${cardMarkup}
      </ul>
    </div>`;
  }

  refs.readNewsContainer.insertAdjacentHTML('beforeend', markup);
  addEventHandlers();
}

function addEventHandlers() {
  const btnsReadMore = document.querySelectorAll('.js-read-news-btn');
  const btnsAddToFavorite = document.querySelectorAll(
    '.item-news__add-to-favorite'
  );

  btnsReadMore.forEach(btn =>
    btn.addEventListener('click', onReadNewsBtnClick)
  );

  refs.readNewsContainer.addEventListener('click', btnAddToFavorite);
}

function onReadNewsBtnClick({ target }) {
  target.classList.toggle('isOpen');
}

function getDataFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (error) {
    showErrorSearch();
  }
}

export function showErrorSearch() {
  refs.errorSearch.classList.remove('is-hidden');
  refs.readNewsContainer.classList.add('is-hidden');
}
