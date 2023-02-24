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
refs.form.addEventListener('submit', onFormSubmit);

function addMarkup(element, constMarkup) {
  element.insertAdjacentHTML('beforeend', constMarkup);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const input = evt.target.elements.inputSearch;
  const inputValue = input.value.trim().toLowerCase();

  const searchNews = filteredNews.filter(news =>
    news.title.toLowerCase().includes(inputValue)
  );

  if (searchNews.length) {
    const markup = searchNews.map(news => createNewsCard(news)).join('');
    refs.favoriteLists.innerHTML = markup;
    hideErrorSearch();
  } else {
    showErrorSearch();
  }

  evt.target.reset();
  input.blur();
}

function showErrorSearch() {
  refs.errorSearch.classList.remove('is-hidden');
  refs.favoriteLists.classList.add('is-hidden');
}

function hideErrorSearch() {
  refs.errorSearch.classList.add('is-hidden');
  refs.favoriteLists.classList.remove('is-hidden');
}
