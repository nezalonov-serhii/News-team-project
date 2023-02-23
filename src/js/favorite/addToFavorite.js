import { newsCardTextFormat } from '../markup/card';

export function btnAddToFavorite(event) {
  const btn = event.target.closest(`.item-news__add-to-favorite`);

  if (!btn) return;
  ///

  const data = localStorage.getItem('news');
  let newLocalStorage = [];

  if (data) {
    newLocalStorage = JSON.parse(localStorage.getItem('news'));
  }

  const newsIndex = newLocalStorage.findIndex(
    item =>
      item.id === btn.closest('.news__article').id ||
      item.id === btn.closest('.news__article').dataset.id
  );

  btn.classList.toggle('hidden-span');

  if (newsIndex > -1) {
    newLocalStorage[newsIndex].favorite = !newLocalStorage[newsIndex].favorite;
    localStorage.setItem(`news`, JSON.stringify(newLocalStorage));

    return;
  }

  addToFavoriteLocalStorage(btn);
}

export function addToFavoriteLocalStorage(btn) {
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

  if (newsIndex > -1) {
    newLocalStorage[newsIndex].favorite = !newLocalStorage[newsIndex].favorite;
    localStorage.setItem(`news`, JSON.stringify(newLocalStorage));
    return;
  }

  const news = {
    id:
      btn.closest('.news__article').dataset.id ||
      btn.closest('.news__article').id,

    media: btn.parentNode.childNodes[1].attributes.src.nodeValue,
    section: btn.parentNode.childNodes[3].innerText,
    title: btn.parentNode.parentNode.childNodes[3].children[0].innerText,
    abstract: newsCardTextFormat(
      btn.parentNode.parentNode.childNodes[3].children[1].innerText
    ),
    published_date:
      btn.parentNode.parentNode.lastElementChild.children[0].innerText,
    url: btn.parentNode.parentNode.lastElementChild.children[1].href,
    read: false,
    favorite: true,

    uri: btn.parentNode.nextElementSibling.nextElementSibling.lastElementChild
      .textContent,
  };

  for (let i = 0; i < newLocalStorage.length; i += 1) {
    if (newLocalStorage[i].uri === news.uri) return;
  }

  newLocalStorage.push(news);
  localStorage.setItem(`news`, JSON.stringify(newLocalStorage));
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
    favorite: false,
    section: btn.parentNode.parentNode.childNodes[1].children[1].innerHTML,
    dayRead: readDateNow,
  };
  newLocalStorage.push(readNews);

  localStorage.setItem(`news`, JSON.stringify(newLocalStorage));
}
