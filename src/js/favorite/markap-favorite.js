import { refs } from '../refs/refs';
import { errorSearch } from '../errorSearch';
import Sprite from '../../images/sprite.svg';

import { btnAddToFavorite } from '../favorite/addToFavorite';

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

// if (parsedNews.length === 0) {
//   refs.errorSearch.classList.remove('is-hidden');
// } else {
//   refs.errorSearch.classList.add('is-hidden');
// }

// errorSearch();

filteredNews.map(el => {
  addMarkup(refs.favoriteLists, createNewsCard(el));
});

function createNewsCard({
  id,
  media,
  title,
  url,
  published_date,
  section,
  abstract,
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
                        <img class="news__img" src="${media}" alt="">
                        <p class="news__category">${section}</p>
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
                    <p class="news__description">${abstract}</p>
                    </div>
                    <div class="news__info">
                        <span class="news__date">${published_date}</span>
                        <a target="_blank" class="news__link-more" href="${url}">Read more</a>
                        <p class="hidden">${uri}</p>
                    </div>
                </article>
      </li>`;
}

function addMarkup(element, constMarkup) {
  element.insertAdjacentHTML('beforeend', constMarkup);
}

refs.favoriteLists.addEventListener('click', btnAddToFavorite);
