import './refs/refs';
import './mobileMenu/mobileMenu';
import './mobileMenu/mobileMenuCurrent';
import './currentPage/currentPage';
import './darkMode/darkMode';
import { refs } from './refs/refs';
import Sprite from '../images/sprite.svg';

import {
  addToFavoriteLocalStorage,
  btnAddToFavorite,
} from './favorite/addToFavorite';

init();

function init() {
  renderReadNews();
}

function renderReadNews() {
  let markup = '';

  const readNews = getDataFromLocalStorage('news');

  if (!readNews) {
    showErrorSearch();
    return;
  }

  const dates = readNews.map(item => item.dayRead);

  if (dates.length < 1) {
    showErrorSearch();
  }

  const uniqDates = Array.from(new Set(dates));
  const filteredDate = uniqDates.filter(date => date !== undefined);

  const sortedDates = filteredDate.sort((a, b) => b.localeCompare(a));
  console.log(sortedDates);

  for (let i = 0; i < sortedDates.length; i += 1) {
    const filteredNews = readNews.filter(
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
  const newsLists = document.querySelectorAll('.read-news__list');

  btnsReadMore.forEach(btn =>
    btn.addEventListener('click', onReadNewsBtnClick)
  );

  refs.readNewsContainer.addEventListener('click', btnAddToFavorite);
  // newsLists.forEach(list => list.addEventListener('click', btnAddToFavorite));
}

function onReadNewsBtnClick({ target }) {
  target.classList.toggle('isOpen');
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

function createNewsCard({
  id,
  img,
  title,
  link,
  date,
  category,
  description,
  uri,
  read,
  favorite,
}) {
  // const newsArray = getDataFromLocalStorage('news');
  // const news = newsArray.find(item => item.id === id);
  // const isFavorite = news ? true : false;

  return `
      <li class="news__item">
        <article class="news__article" id="${id}">
                    <div class="news__wrapper" >
                        <img class="news__img" src="${img}" alt="">
                        <p class="news__category">${category}</p>

                        <button type="button" class="item-news__add-to-favorite ${
                          favorite ? 'hidden-span' : ''
                        }">
                          Add to favorite
                            <svg class="item-news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">
                                    <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
                            </svg></span>
                                    <span class="item-news__remove-to-favorite-btn">Remove from favorite
                            <svg class="item-news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">
                                    <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
                            </svg>
                        </button>             
                    </div>
                    <div class="new__text-wrapper">
                    <h2 class=" news__title">${title}</h2>
                    <p class="news__description">${description}</p>
                    </div>
                    <div class="news__info">
                        <span class="news__date">${date}</span>
                        <a target="_blank" class="news__link-more" href="${link}">Read more</a>
                        <p class="hidden">${uri}</p>
                    </div>
                </article>
      </li>`;
}

function isLocalEmpty() {
  if (JSON.parse(localStorage.getItem('news')) === null) {
    newLocalStorage = [];
    return;
  }
  newLocalStorage = JSON.parse(localStorage.getItem('news'));
}

// // Створюємо масив "favorites" за допомогою методу "filter", в якому зберігаємо об'єкти з масиву "newsSection",
// // у яких властивість "favorite" має значення "true".
// const favorites = JSON.parse(localStorage.getItem('newsSection')).filter(
//   item => item.favorite === 'true'
// );

// // Знаходимо всі кнопки з класом "item-news__add-to-favorite" та зберігаємо їх у змінну "addButtons".
// const addButtons = document.querySelectorAll('.item-news__add-to-favorite');

// // Для кожної кнопки перевіряємо, чи є відповідна стаття у списку улюблених, який зберігається у масиві "favorites".
// // Якщо така стаття існує, то додаємо до кнопки клас "hidden-span", який приховує кнопку.
// addButtons.forEach(button => {
//   const uri =
//     button.parentNode.nextElementSibling.nextElementSibling.lastElementChild
//       .textContent;
//   if (favorites.some(item => item.uri === uri)) {
//     button.classList.add('hidden-span');
//   }
// });

function showErrorSearch() {
  refs.errorSearch.classList.remove('is-hidden');
  refs.readNewsContainer.classList.add('is-hidden');
}
