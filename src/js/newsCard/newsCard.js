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

function createNewsCard({
  title,
  media,
  url,
  published_date,
  section,
  abstract,
  id,
  uri,
}) {
  return `
      <li class="news__item" style = "order:${orderedNumber} ">
        <article class="news__article" id="${id}">
                    <div class="news__wrapper" >
                        <img class="news__img" src="${media}" alt="">
                        <p class="news__category">${section}</p>
                        <span class ="news__read-status hidden">Already read <svg class="icon-chek" width="24" height="24"><use href=${
                          Sprite + '#icon-chek'
                        }></use></svg></span>
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
                    <p class="news__description">${newsCardTextFormat(
                      abstract
                    )}</p>
                    </div>
                    <div class="news__info">
                        <span class="news__date">${published_date}</span>
                        <a target="_blank" class="news__link-more" href="${url}">Read more</a>
                        <p class="hidden">${uri}</p>
                    </div>
                </article>
      </li>    
    `;
}

// addMarkup Додаю розмітку

function addMarkup(element, constMarkup) {
  element.insertAdjacentHTML('beforeend', constMarkup);
}

function addMarkupAfter(element, constMarkup) {
  element.insertAdjacentHTML('afterbegin', constMarkup);
}

//Add ... 80 elements Перевірка довжини тексту

function newsCardTextFormat(element) {
  let textFormat = element;
  if (textFormat.length > 80) {
    textFormat = element.slice(0, 80) + '...';
  }
  return textFormat;
}

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

function addReadMore(readMore) {
  const evenDateNow = new Date();
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const readDateNow = evenDateNow
    .toLocaleDateString([], options)
    .replaceAll('.', '/');
  const read = {
    id:
      readMore.closest('.news__article').dataset.id ||
      readMore.closest('.news__article').id,
    uri: readMore.nextElementSibling.textContent,
    published_date: readMore.parentNode.firstElementChild.innerText,
    media: readMore.parentNode.parentNode.childNodes[1].children[0].currentSrc,
    title: readMore.parentNode.parentNode.childNodes[3].children[0].innerText,
    abstract:
      readMore.parentNode.parentNode.childNodes[3].children[1].innerText,
    url: readMore.parentNode.children[1].href,
    read: true,
    favorite: false,
    section: readMore.parentNode.parentNode.childNodes[1].children[1].innerHTML,
    dayRead: readDateNow,
  };
  for (let i = 0; i < readMoreId.length; i += 1) {
    if (readMoreId[i].uri === read.uri) {
      return;
    }
  }
  readMoreId.push(read);
  localStorage.setItem(`news`, JSON.stringify(readMoreId));
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

export { createNewsCard, newsCardTextFormat };
