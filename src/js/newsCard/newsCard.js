import { getPopular } from '../api/news.js';
import { hideLoader } from '../loader/loader';
import { orderedNumber } from '../markup/markup.js';

import { btnAddToFavorite } from '../favorite/addToFavorite';

const newsList = document.querySelector('.news__lists');

const newsCard = document.querySelector('.news__item');

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

export { createNewsCard, newsCardTextFormat };
