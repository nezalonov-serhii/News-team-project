import { getPopular } from '../api/news.js';
import { hideLoader } from '../loader/loader';
import { orderedNumber } from '../markup/markup.js';
import { btnAddToFavorite } from '../favorite/addToFavorite';

import Sprite from '../../images/sprite.svg';

const newsList = document.querySelector('.news__lists');
// console.log(newsList);

const newsCard = document.querySelector('.news__item');
// console.log(newsCard);

// const readMoreBtn = document.querySelector("a");
// console.log(readMoreBtn)

//Створюється одна карточка

// getPopular()
//   .then(data => {
//     addMarkup(newsList, createNewsCard(data[0]));
//   })
//   .catch()
//   .finally(data => hideLoader());

//Функція створення однієї карточки

// addMarkup Додаю розмітку

function addMarkup(element, constMarkup) {
  element.insertAdjacentHTML('beforeend', constMarkup);
}

function addMarkupAfter(element, constMarkup) {
  element.insertAdjacentHTML('afterbegin', constMarkup);
}

//Add ... 80 elements Перевірка довжини тексту

//Клік мишкою на улюблене

newsList.addEventListener('click', btnAddToFavorite);
let newLocalStorage = [];

//Клік на readmore

newsList.addEventListener('click', linkReadMore);

//Перевірка чи є Favorite в  LocalStorage

function isLocalEmpty() {
  if (JSON.parse(localStorage.getItem('news')) === null) {
    newLocalStorage = [];
    return;
  }
  newLocalStorage = JSON.parse(localStorage.getItem('news'));
}
isLocalEmpty();

// Перевірка чи є Readmore в LocalStorage
let readMoreId = [];
isLocalReadEmpty();

function isLocalReadEmpty() {
  if (JSON.parse(localStorage.getItem('news')) === null) {
    return;
  }
  readMoreId = JSON.parse(localStorage.getItem('news'));
}

//Кнопка Readmore

function linkReadMore(event) {
  const readMore = event.target.closest(`.news__link-more`);
  if (!readMore) return;

  console.log(readMore);
  // console.log(readMore.nextElementSibling);

  readMore.parentNode.parentNode.parentNode.classList.add('opacity');
  addReadMore(readMore);
  // Have read
  const btn = event.target.closest(`.news__article`);
  console.log(btn);

  const Readmorestatus = btn.parentNode.children[0].children[0].children[2];
  // const Readmorestatus = btn.children[0].children[2];
  console.log(Readmorestatus);

  Readmorestatus.classList.remove('hidden');
  addMarkupAfter(newsCard);
}

//Кнопка улюблене

//Додаємо в Readmore

function addReadMore(btn) {
  const data = localStorage.getItem('news');

  let newLocalStorage = [];

  if (data) {
    newLocalStorage = JSON.parse(localStorage.getItem('news'));
  }

  const newsIndex = newLocalStorage.findIndex(
    item => item.id === btn.closest('.news__article').dataset.id
  );

  if (newsIndex > -1) {
    const evenDateNow = new Date();

    newLocalStorage[newsIndex].read = true;
    newLocalStorage[newsIndex].dayRead = evenDateNow
      .toLocaleDateString([], options)
      .replaceAll('.', '/');
    localStorage.setItem(`news`, JSON.stringify(newLocalStorage));
    return;
  }

  const evenDateNow = new Date();
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const readDateNow = evenDateNow
    .toLocaleDateString([], options)
    .replaceAll('.', '/');

  const readNews = {
    id: btn.parentNode.parentNode.dataset.id,
    uri: btn.nextElementSibling.textContent,
    published_date: btn.parentNode.firstElementChild.innerText,
    media: btn.parentNode.parentNode.childNodes[1].children[0].currentSrc,
    title: btn.parentNode.parentNode.childNodes[3].children[0].innerText,
    abstract: btn.parentNode.parentNode.childNodes[3].children[1].innerText,
    url: btn.parentNode.children[1].href,
    read: true,
    section: btn.parentNode.parentNode.childNodes[1].children[1].innerHTML,
    dayRead: readDateNow,
  };
  newLocalStorage.push(readNews);
  localStorage.setItem(`news`, JSON.stringify(newLocalStorage));
}

//

function makeReadNewsMarkup(news) {
  return `
  <div class="read-news__list">
    <button class="read-news__btn js-read-news-btn">
      <span>20/02/2021</span>
      <svg><use href="${Sprite + '#arrow-down'}"></use></svg></button></div>
      `;
}
