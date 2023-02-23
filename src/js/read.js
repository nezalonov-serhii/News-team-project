import './refs/refs';
import './mobileMenu/mobileMenu';
import './mobileMenu/mobileMenuCurrent';
import './currentPage/currentPage';
import './darkMode/darkMode';
import { refs } from './refs/refs';
import Sprite from '../images/sprite.svg';

import { btnAddToFavorite, addToFavoriteLocal } from './favorite/addToFavorite';

init();
function init() {
  addEventHandlers();

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

function addEventHandlers() {
  const btnsReadMore = document.querySelectorAll('.js-read-news-btn');
  const btnsAddToFavorite = document.querySelectorAll(
    '.item-news__add-to-favorite'
  );
  const newsLists = document.querySelectorAll('.read-news__list');

  btnsReadMore.forEach(btn =>
    btn.addEventListener('click', onReadNewsBtnClick)
  );
  refs.readNewsContainer.addEventListener('click', addToFavoriteLocal);
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
      <li class="news__item ${read ? 'opacity' : ''}">
        <article class="news__article" id="${id}">
                    <div class="news__wrapper" >
                        <img class="news__img" src="${img}" alt="">
                        <p class="news__category">${category}</p>
                          <span class ="news__read-status ${
                            !read ? 'hidden' : ''
                          }">Already read 
                        <svg class="icon-chek" width="24" height="24">
                          <use href=${Sprite + '#icon-chek'}>
                          </use>
                        </svg>
                       </span>                   
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

function btnAddToFavorite(event) {
  const btn = event.target.closest(`.item-news__add-to-favorite`);

  if (!btn) return;
  isLocalEmpty();
  let uri =
    btn.parentNode.nextElementSibling.nextElementSibling.lastElementChild
      .textContent;
  if (!btn.classList.contains('hidden-span')) {
    btn.classList.add('hidden-span');

    addToFavoriteLocal(btn);
    return;
  }
  btn.classList.remove('hidden-span');
  for (let i = 0; i < newLocalStorage.length; i += 1) {
    if (newLocalStorage[i].uri === uri) {
      newLocalStorage.splice(i, 1);
    }
  }
  localStorage.setItem(`newsSection`, JSON.stringify(newLocalStorage));
}

function isLocalEmpty() {
  if (JSON.parse(localStorage.getItem('news')) === null) {
    newLocalStorage = [];
    return;
  }
  newLocalStorage = JSON.parse(localStorage.getItem('news'));
}

function addToFavoriteLocal(btn) {
  const newsSection = {
    id: btn.closest('.news__article').dataset.id,
    img: btn.parentNode.childNodes[1].attributes.src.nodeValue,
    category: btn.parentNode.childNodes[3].innerText,
    title: btn.parentNode.parentNode.childNodes[3].children[0].innerText,
    description: btn.parentNode.parentNode.childNodes[3].children[1].innerText,
    date: btn.parentNode.parentNode.lastElementChild.children[0].innerText,
    link: btn.parentNode.parentNode.lastElementChild.children[1].attributes[1]
      .value,
    favorite: true,
    read: false,
    uri: btn.parentNode.nextElementSibling.nextElementSibling.lastElementChild
      .textContent,
  };
  for (let i = 0; i < newLocalStorage.length; i += 1) {
    if (newLocalStorage[i].uri === newsSection.uri) return;
  }

  newLocalStorage.push(newsSection);
  localStorage.setItem(`newsSection`, JSON.stringify(newLocalStorage));
}

function showErrorSearch() {
  refs.errorSearch.classList.remove('is-hidden');
  refs.readNewsContainer.classList.add('is-hidden');
}
