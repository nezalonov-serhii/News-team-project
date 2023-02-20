import { Notify } from 'notiflix';

import './refs/refs';
import './mobileMenu/mobileMenu';
import './mobileMenu/mobileMenuCurrent';
import { refs } from './refs/refs';
import Sprite from '../images/sprite.svg';

init();

function init() {
  addEventHandlers();
  renderReadNews();
}

function renderReadNews() {
  let markup = '';

  const readNews = getDataFromLocalStorage('readMoreLocal');

  const dates = readNews.map(item => item.date);
  const uniqDates = Array.from(new Set(dates));

  console.log(uniqDates);
  console.log(uniqDates.sort((a, b) => b.localeCompare(a)));

  for (let i = 0; i < uniqDates.length; i += 1) {
    const filteredNews = readNews.filter(item => item.date === uniqDates[i]);
    const cardMarkup = filteredNews.map(item => createNewsCard(item));

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
  btns.forEach(btn => btn.addEventListener('click', onReadNewsBtnClick));
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
    Notify.failure('Error: ' + error.message);
  }
}

function createNewsCard({
  title,
  img,
  url,
  published_date,
  section,
  description,
  id,
  uri,
}) {
  return `
      <li class="news__item >
        <article class="news__article" id="${id}">
                    <div class="news__wrapper" >
                        <img class="news__img" src="${img}" alt="">

                        <p class="news__category">${section}</p>

                        <button type="button" class="item-news__add-to-favorite ">
                          <span class="item-news__add-to-favorite-btn">Add to favorite
                            <svg class="item-news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">
                                    <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
                                    </svg></span>
                                    <span class="item-news__remove-to-favorite-btn">Remove from favorite
                                    <svg class="item-news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">
                                    <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
                                    </svg></span>
                          </button>

                        
                    </div>
                    <div class="new__text-wrapper">
                    <h2 class=" news__title">${title}</h2>
                    <p class="news__description">${description}</p>
                    </div>
                    <div class="news__info">
                        <span class="news__date">${published_date}</span>
                        <a target="_blank" class="news__link-more" href="${url}">Read more</a>
                        <p class="hidden">${uri}</p>
                    </div>
                </article>
      </li>`;
}
