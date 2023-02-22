import { refs } from './refs/refs';

export function errorSearch() {
  const savedNews = localStorage.getItem('newsSection');
  const parsedNews = JSON.parse(savedNews);

  if (parsedNews.length === 0) {
    refs.errorSearch.classList.remove('is-hidden');
    refs.favorite.classList.add('is-hidden');

    console.log(refs.favorite);
  } else {
    refs.errorSearch.classList.add('is-hidden');
    refs.favorite.classList.remove('is-hidden');
  }
}
