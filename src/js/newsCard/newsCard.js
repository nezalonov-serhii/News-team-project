import { getPopular } from '../api/news.js';

const newsList = document.querySelector('.news__item');

getPopular().then(data => {
  // console.log(data[0]);
  // console.log(createNewsCard(data[0]));

  addMarkup(newsList, createNewsCard(data[0]));
});

// url

function createNewsCard({
  title,
  media,
  url,
  published_date,
  section,
  abstract,
}) {
  return `
            <li class="news__item">
                <article class="news__article">
                    <div class="news__wrapper">
                        <img class="news__img" src="${media[0]['media-metadata'][2].url}" alt="">
                        <p class="news__category">${section}</p>
                        <p class="news__favorite">Add to favorite

                            <svg class="news__icon" width="16" height="16" viewBox="0 0 37 32">
                                
                                <path fill="none" stroke="#4440f7" style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2" d="M9.333 4c-3.681 0-6.667 2.955-6.667 6.6 0 2.943 1.167 9.927 12.651 16.987 0.206 0.125 0.442 0.191 0.683 0.191s0.477-0.066 0.683-0.191c11.484-7.060 12.651-14.044 12.651-16.987 0-3.645-2.985-6.6-6.667-6.6s-6.667 4-6.667 4-2.985-4-6.667-4z"></path>

                            </svg>

                        </p>
                    </div>
                    <h2 class=" news__title">${title}</h2>
                    <p class="news__description">${abstract}</p>
                    <div class="news__info">
                        <span class="news__date">${published_date}</span>
                        <a class="news__link-more" href="${url}">Read more</a>
                    </div>
                </article>
            </li>
    `;
}

// addMarkup

function addMarkup(element, constMarkup) {
  element.insertAdjacentHTML('beforeend', constMarkup);
}

//             <div class="photo-card">
//     <a class='photo-link' href="${largeImageURL }">
//     <img class ="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
//     </a>
//     <div class="info">
//       <p class="info-item">
//         <b>Likes</b>${likes}
//       </p>
//       <p class="info-item">
//         <b>Views</b>${views}
//       </p>
//       <p class="info-item">
//         <b>Comments</b>${comments}
//       </p>
//       <p class="info-item">
//         <b>Downloads</b>${downloads}
//       </p>
//     </div>
//   </div>
