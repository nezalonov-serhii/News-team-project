import { refs } from '../refs/refs';

import { btnAddToFavorite } from '../favorite/addToFavorite';
import { linkReadMore } from '../btns/readMore';
import { createNewsCard } from '../markup/card';

const savedNews = localStorage.getItem('news');
const parsedNews = JSON.parse(savedNews);

if (!parsedNews) {
  refs.errorSearch.classList.remove('is-hidden');
  refs.favorite.classList.add('is-hidden');

  return;
}

const filteredNews = parsedNews.filter(news => news.favorite === true);

if (filteredNews.length < 1) {
  refs.errorSearch.classList.remove('is-hidden');
  refs.favorite.classList.add('is-hidden');
  return;
}
filteredNews.map(el => {
  addMarkup(refs.favoriteLists, createNewsCard(el));
});

refs.favoriteLists.addEventListener('click', btnAddToFavorite);
refs.favorite.addEventListener('click', linkReadMore);

function addMarkup(element, constMarkup) {
  element.insertAdjacentHTML('beforeend', constMarkup);
}
