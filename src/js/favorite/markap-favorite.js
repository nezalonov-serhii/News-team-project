import { refs } from '../refs/refs';
import { errorSearch } from '../errorSearch';

console.log(refs.favorite);

const savedNews = localStorage.getItem('news');
const parsedNews = JSON.parse(savedNews);

// if (parsedNews.length === 0) {
//   refs.errorSearch.classList.remove('is-hidden');
// } else {
//   refs.errorSearch.classList.add('is-hidden');
// }

errorSearch();

parsedNews.map(el => {
  addMarkup(refs.favoriteLists, createNewsCard(el));
});

function createNewsCard({
  id,
  category,
  date,
  description,
  favorite,
  img,
  title,
  uri,
}) {
  return `
    <li class="news__item ">
     <article class="news__article" data-id="${id}">
                    <div class="news__wrapper" >
                        <img class="news__img" src="${img}" alt="">

                        <p class="news__category">${category}</p>

                        <button type="button" class="item-news__add-to-favorite ">
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
                    <p class="news__description">${description}</p>
                    </div>
                    <div class="news__info">
                        <span class="news__date">${date}</span>
                        <a target="_blank" class="news__link-more" href="${uri}">Read more</a>
                    </div>
                </article>
    </li>
    `;
}

function addMarkup(element, constMarkup) {
  element.insertAdjacentHTML('beforeend', constMarkup);
}

refs.favoriteLists.addEventListener('click', btnFavoriteRemove);

function btnFavoriteRemove(e) {
  if (e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'path') return;

  const id = e.target.closest('.news__article').dataset.id;
  const indexElLocalStorege = parsedNews.findIndex(e => e.id === id);

  localStorage.removeItem('news');
  parsedNews.splice(indexElLocalStorege, 1);

  localStorage.setItem(`news`, JSON.stringify(parsedNews));

  refs.favoriteLists.innerHTML = '';

  console.log(parsedNews);
  errorSearch();

  parsedNews.map(el => {
    addMarkup(refs.favoriteLists, createNewsCard(el));
  });
}
