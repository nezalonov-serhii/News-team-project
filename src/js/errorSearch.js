import { refs } from './refs/refs';

export function errorSearch() {
  const savedNews = localStorage.getItem('news');
  const parsedNews = savedNews === null ? undefined : JSON.parse(savedNews);

  if (!parsedNews) {
    refs.errorSearch.classList.remove('is-hidden');
    refs.favorite.classList.add('is-hidden');

    console.log(refs.favorite);
  } else {
    refs.errorSearch.classList.add('is-hidden');
    refs.favorite.classList.remove('is-hidden');
  }
}
