import './refs/refs';
import './mobileMenu/mobileMenu';
import './mobileMenu/mobileMenuCurrent';
import './currentPage/currentPage';
import './darkMode/darkMode';

import { refs } from './refs/refs';
import Sprite from '../images/sprite.svg';
import { createNewsCard } from './markup/card';
import { btnAddToFavorite } from './favorite/addToFavorite';

// import { btnAddToFavorite } from './newsCard/newsCard';

init();

function init() {
  addEventHandlers();
  renderReadNews();
}

function renderReadNews() {
  let markup = '';

  const readNews = getDataFromLocalStorage('readMoreLocal');

  if (!readNews) {
    return;
  }

  const dates = readNews.map(item => item.dayRead);
  const uniqDates = Array.from(new Set(dates));
  const sortedDates = uniqDates.sort((a, b) => b.localeCompare(a));

  for (let i = 0; i < uniqDates.length; i += 1) {
    const filteredNews = readNews.filter(
      item => item.dayRead === sortedDates[i]
    );
    const cardMarkup = filteredNews.map(item => createNewsCard(item)).join('');

    markup += `<div class="read-news__list">
      <button class="read-news__btn js-read-news-btn">
        <span>${uniqDates[i]}</span>
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

function getReadNewsBtn() {
  return document.querySelectorAll('.js-read-news-btn');
}

function addEventHandlers() {
  const btns = getReadNewsBtn();
  const newsLists = document.querySelectorAll('.read-news__list');

  btns.forEach(btn => btn.addEventListener('click', onReadNewsBtnClick));
  newsLists.forEach(list => list.addEventListener('click', btnAddToFavorite));
}

function onReadNewsBtnClick({ target }) {
  target.classList.toggle('isOpen');

  addEventHandlers();
}

function makeReadNewsMarkup(news) {
  return `<div class="read-news__list">
    <button class="read-news__btn js-read-news-btn">
      <span>20/02/2021</span>
      <svg><use href="${Sprite + '#arrow-down'}"></use></svg>
    </button>
  </div>`;
}

function getDataFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (error) {
    refs.errorSearch.classList.remove('is-hidden');
    refs.readNewsContainer.classList.add('is-hidden');
  }
}

function addToFavoriteLocal(btn) {
  const newsSection = {
    id: btn.parentNode.parentNode.id,
    media: btn.parentNode.childNodes[1].attributes.src.nodeValue,
    category: btn.parentNode.childNodes[3].innerText,
    title: btn.parentNode.parentNode.childNodes[3].children[0].innerText,
    abstract: btn.parentNode.parentNode.childNodes[3].children[1].innerText,
    published_date:
      btn.parentNode.parentNode.lastElementChild.children[0].innerText,
    url: btn.parentNode.parentNode.lastElementChild.children[1].attributes[1]
      .value,
    favorite: 'true',
    uri: btn.parentNode.nextElementSibling.nextElementSibling.lastElementChild
      .textContent,
  };
  for (let i = 0; i < newLocalStorage.length; i += 1) {
    if (newLocalStorage[i].uri === newsSection.uri) return;
  }

  newLocalStorage.push(newsSection);
  localStorage.setItem(`newsSection`, JSON.stringify(newLocalStorage));
}
