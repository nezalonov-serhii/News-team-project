import './refs/refs';
import './mobileMenu/mobileMenu';
import './mobileMenu/mobileMenuCurrent';
import './currentPage/currentPage';
import './darkMode/darkMode';
import { refs } from './refs/refs';
import Sprite from '../images/sprite.svg';
import { showLoader, hideLoader } from './loader/loader';

import { createNewsCard } from './markup/card';

import { btnAddToFavorite } from './favorite/addToFavorite';

let filteredNews = [];

showLoader();
renderReadNews();
hideLoader();

refs.form.addEventListener('submit', onFormSubmit);

function renderReadNews() {
  const parsedNews = getDataFromLocalStorage('news');

  if (!parsedNews) {
    showErrorSearch();
    return;
  }

  filteredNews = parsedNews.filter(news => news.read === true);

  if (filteredNews.length < 1) {
    showErrorSearch();
    return;
  }

  updateUI(filteredNews);
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const input = evt.target.elements.inputSearch;
  const inputValue = input.value.trim().toLowerCase();

  const searchNews = filteredNews.filter(news =>
    news.title.toLowerCase().includes(inputValue)
  );

  if (!searchNews.length) {
    showErrorSearch();
  } else {
    hideErrorSearch();
    updateUI(searchNews);
  }

  input.blur();
  evt.target.reset();
}

function hideErrorSearch() {
  refs.errorSearch.classList.add('is-hidden');
  refs.readNewsContainer.classList.remove('is-hidden');
}

export function showErrorSearch() {
  refs.errorSearch.classList.remove('is-hidden');
  refs.readNewsContainer.classList.add('is-hidden');
}

function updateUI(searchNews) {
  const markup = getNewsMarkup(searchNews);
  refs.readNewsContainer.innerHTML = markup;
  addEventHandlers();
}

function getNewsMarkup(news) {
  const dates = news.map(item => item.dayRead);

  if (dates.length < 1) {
    showErrorSearch();
  }

  let markup = '';
  const uniqDates = Array.from(new Set(dates));
  const filteredDate = uniqDates.filter(date => date !== undefined);
  const sortedDates = filteredDate.sort((a, b) => b.localeCompare(a));

  for (let i = 0; i < sortedDates.length; i += 1) {
    const newsArray = news.filter(item => item.dayRead === sortedDates[i]);
    const cardMarkup = newsArray.map(item => createNewsCard(item)).join('');

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

  return markup;
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
