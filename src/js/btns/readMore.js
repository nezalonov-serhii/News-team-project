import { newsCardTextFormat } from '../markup/card';

const newsCard = document.querySelector('.news__item');

export function linkReadMore(event) {
  const readMore = event.target.closest(`.news__link-more`);

  if (!readMore) return;

  readMore.parentNode.parentNode.parentNode.classList.add('opacity');
  console.log('before');
  addReadMore(readMore);
  console.log('after');

  // Have read
  const btn = event.target.closest(`.news__article`);
  console.log(btn);

  const Readmorestatus = btn.parentNode.children[0].children[0].children[2];

  Readmorestatus.classList.remove('hidden');
  addMarkupAfter(newsCard);
}

function addMarkupAfter(element, constMarkup) {
  element.insertAdjacentHTML('afterbegin', constMarkup);
}

function addReadMore(btn) {
  const data = localStorage.getItem('news');

  let newLocalStorage = [];

  if (data) {
    newLocalStorage = JSON.parse(localStorage.getItem('news'));
  }

  const newsIndex = newLocalStorage.findIndex(
    item =>
      item.id === btn.closest('.news__article').dataset.id ||
      item.id === btn.closest('.news__article').id
  );

  const evenDateNow = new Date();
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const readDateNow = evenDateNow
    .toLocaleDateString([], options)
    .replaceAll('.', '/');

  if (newsIndex > -1) {
    const evenDateNow = new Date();

    newLocalStorage[newsIndex].read = true;
    newLocalStorage[newsIndex].dayRead = evenDateNow
      .toLocaleDateString([], options)
      .replaceAll('.', '/');
    localStorage.setItem(`news`, JSON.stringify(newLocalStorage));
    return;
  }

  const readNews = {
    id: btn.parentNode.parentNode.dataset.id,
    uri: btn.nextElementSibling.textContent,
    published_date: btn.parentNode.firstElementChild.innerText,
    media: btn.parentNode.parentNode.childNodes[1].children[0].currentSrc,
    title: btn.parentNode.parentNode.childNodes[3].children[0].innerText,
    abstract: btn.parentNode.parentNode.childNodes[3].children[1].innerText,
    url: btn.parentNode.children[1].href,
    read: true,
    favorite: false,
    section: btn.parentNode.parentNode.childNodes[1].children[1].innerHTML,
    dayRead: readDateNow,
  };
  newLocalStorage.push(readNews);

  localStorage.setItem(`news`, JSON.stringify(newLocalStorage));
}
