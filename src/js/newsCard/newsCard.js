
import API from "../api/news.js"

const newsList = document.querySelector(".news__item");

API.getPopular().then((data) => {
    
console.log(data[0])
console.log(createNewsCard(data[0]));

addMarkup(newsList, createNewsCard);

});




function createNewsCard({title, media}) {
      
    return `
            <li class="news__item">
                <article class="news__article">
                    <div class="news__wrapper">
                        <img class="news__img" src="${media[0]["media-metadata"][2].url}" alt="">
                        <p class="news__category">${title}</p>
                        <p class="news__favorite">Add to favorite

                            <svg class="news__icon" width="16" height="16">
                                <use href="./images/sprite.svg#icon-like-stroke"></use>
                                <use href="./images/sprite.svg#like"></use>
                            </svg>

                        </p>
                    </div>
                    <h2 class=" news__title">
                    </h2>
                    <p class="news__description"></p>
                    <div class="news__info">
                        <span class="news__date">
                        </span>
                        <a class="news__link-more" href="#">Read more</a>
                    </div>
                </article>
            </li>
    `
;
};

// addMarkup

function addMarkup(element, constMarkup) {
    element.insertAdjacentHTML("beforeend", constMarkup);
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