import { refs } from '../refs/refs';
import { hideLoader } from '../loader/loader';
import {
  getPopular,
  getCategoryList,
  getSearchArticle,
  getDataByCategory,
} from '../api/news';
import { createNewsCard, newsCardTextFormat } from '../newsCard/newsCard';

// import {KEY,BASE_URL,POPULAR_NEWS} from "../api/news"
// const sonic = "https://images.app.goo.gl/JcSM7XQrF2fSyDfa7"

let page = 8;
let arrayNewsCard = [];

const listOfNewsValues = {
  title,
  media,
  url,
  published_date,
  section,
  abstract,
  id,
  uri,
};

// function saveValuesFromSearchNews(article){
//     listOfNewsValues.title = article.title;
//     listOfNewsValues.media = article.media[0]['media-metadata'][2].url;
//     listOfNewsValues.url = article.url;
//     listOfNewsValues.published_date = article.published_date
//     listOfNewsValues.section = article.section
//     listOfNewsValues.abstract = article.abstract
//     listOfNewsValues.id = article.id
//     listOfNewsValues.uri = article.uri

// };
function saveValuesFromPopularNews(articles) {
    console.log(articles)
  articles.map(article => {
    console.log(article)
    listOfNewsValues.title = article.title;
    listOfNewsValues.media = article.media[0]['media-metadata'][2].url;
    listOfNewsValues.url = article.url;
    listOfNewsValues.published_date = article.published_date;
    listOfNewsValues.section = article.section;
    listOfNewsValues.abstract = article.abstract;
    listOfNewsValues.id = article.id;
    listOfNewsValues.uri = article.uri;
    arrayNewsCard.push(listOfNewsValues);
  });
}
// function saveValuesFromCategoryNews(article){
//     listOfNewsValues.title = article.title;
//     listOfNewsValues.media = article.media[0]['media-metadata'][2].url;
//     listOfNewsValues.url = article.url;
//     listOfNewsValues.published_date = article.published_date
//     listOfNewsValues.section = article.section
//     listOfNewsValues.abstract = article.abstract
//     listOfNewsValues.id = article.id
//     listOfNewsValues.uri = article.uri
// };

let orderedNumber = 0;
refs.form.addEventListener('submit', renderSearchNews);
refs.filterCategories.addEventListener('click', renderNewsCategory);

renderPopularNews();

function renderSearchNews(e) {
  e.preventDefault();
  const inputSearchValue = refs.form.elements.inputSearch.value;
  getSearchArticle(inputSearchValue, page)
    .then(articles => {
      console.log(articles);
      renderNewsList(articles);
    })
    .catch()
    .finally(data => {
      hideLoader();
      // reset()
    });
}
function renderPopularNews() {
  getPopular()
    .then(articles => {
        
      console.log(articles);
    saveValuesFromPopularNews(articles)
      renderNewsList(arrayNewsCard);
    })
    .catch()
    .finally(hideLoader());
}

function renderNewsCategory(e) {
  // console.log(e.target)
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  const categoryName = e.target.dataset.category_name;

  //   console.log(categoryName);

  //   const currentBank = findParticularId(identification);
  //   renderBankInfo(currentBank);
  getDataByCategory(categoryName)
    .then(articles => {
      console.log(articles);
      renderNewsList(articles);
    })
    .catch()
    .finally(hideLoader());
}

//  Сheck viewport
// const mqlMobile = window.matchMedia("(max-width:480px)")
// const mqlTablet = window.matchMedia("(max-width:768px)")
// const mqlDekstop  = window.matchMedia("(min-width:1280px)")

// const listOfValuesForCard = {
//     title,
//   media,
//   url,
//   published_date,
//   section,
//   abstract,
//   id,
//   uri,
// }

function renderNewsList(articles) {
  const markup = articles.reduce((previousValue, article, index) => {
    orderedNumber += 1;
    if (index === 2) {
      return createMarkupWidgetWeather(orderedNumber) + previousValue;
    }

    //  console.log(previousValue)
    return createNewsCard(article, orderedNumber) + previousValue;
  }, '');

  updateNewsList(markup);
  orderedNumber = 0;
}

// Мій варіант картки
// function createMarkupNewsCard({
//     title,
//     multimedia,

//     published_date,
//     section,
//     abstract,
//   }){
//     return `<li class="news__item" style = "order:${orderedNumber} ">
//     <article class="news__article">
//         <div class="news__wrapper">
//         <img class="news__img" src= ${multimedia !== null ? multimedia[0].url : sonic}
//                  alt="">
//             <p class="news__category">Job searching</p>
//             <p class="news__favorite">Add to favorite

//                 <svg class="news__icon" width="16" height="16">
//                     <use href="./images/sprite.svg#icon-like-stroke"></use>
//                     <use href="./images/sprite.svg#like"></use>
//                 </svg>

//             </p>
//         </div>
//         <h2 class=" news__title">${title}
//         </h2>
//         <p class="news__description">${abstract}</p>
//         <div class="news__info">
//             <span class="news__date">${published_date}

//             </span>
//             <a class="news__link-more" href="#">Read more</a>
//         </div>
//     </article>
//     </li>`
// }
function updateNewsList(markup) {
  // refs.newsList.insertAdjacentHTML('beforeend', markup);

  refs.newsList.innerHTML = markup;
}

function createMarkupWidgetWeather() {
  return `<li class =" news__item location_weather"  ><div class=" news__weather"><p class = "text_weather">Weather<p></div></li>`;
}

export {
  renderNewsList,
  updateNewList,
  createMarkupWidgetWeather,
  orderedNumber,
};

// It doesn't work!!! Why?
// function  increaseQuantityOfOrder(orderedNumber){
// orderedNumber += 1
//   }
// function reset(orderedNumber){
//     orderedNumber = 0
// }
