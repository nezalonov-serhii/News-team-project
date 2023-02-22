import { refs } from '../refs/refs';
import { hideLoader } from '../loader/loader';
import Sprite from '../../images/sprite.svg';

import { createNewsCard, newsCardTextFormat } from '../newsCard/newsCard';
import { fillWeather } from '../weather/weather';
// fillWeather()
let arrayNewsCard = [];
const error =
  'https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1931.jpg';
let page = 2;
let orderedNumber = 0;

function saveValuesFromCategoryNews(articles) {
  refs.newsList.innerHTML = '';
  arrayNewsCard = [];

  articles.map(article => {
    arrayNewsCard.push({
      title: article.title,
      media: `${
        article.multimedia === null ? error : `${article.multimedia[2].url}`
      }`,
      url: article.url,
      published_date: `${normolizeDate(article.published_date)}`,
      section: article.section,
      abstract: article.abstract,
      id: article.id,
      uri: article.uri,
    });
  });
}

function saveValuesFromSearchNews(articles) {
  refs.newsList.innerHTML = '';
  arrayNewsCard = [];

  articles.map(article => {
    arrayNewsCard.push({
      title: article.headline.main,

      media: `${
        article.multimedia[0] === undefined
          ? // article.multimedia.length === 0
            error
          : `https://static01.nyt.com/${article.multimedia[0].url}`
      }`,

      url: article.url,
      published_date: `${normolizeDate(article.pub_date)}`,
      section: article.section_name,
      abstract: article.abstract,
      id: article._id,
      uri: article.uri,
    });
  });
}
function saveValuesFromPopularNews(articles) {
  articles.map(article => {
    arrayNewsCard.push({
      title: article.title,
      media: `${
        article.media[0] === undefined
          ? error
          : article.media[0]['media-metadata'][2].url
      }`,
      url: article.url,
      published_date: article.published_date,
      section: article.section,
      abstract: article.abstract,
      id: article.id,
      uri: article.uri,
    });
  });
}

function renderPopularNews(articles) {
  refs.newsList.innerHTML = '';
  arrayNewsCard = [];

  saveValuesFromPopularNews(articles);
  renderNewsList(arrayNewsCard);
}

// function renderNewsCategory(e) {

// if (e.target.nodeName !== 'BUTTON' || e.target === refs.filterOthers) {
//   return;
// }
// const categoryName = e.target.dataset.category_name;

// console.log(categoryName);

// getDataByCategory(categoryName)
//   .then(articles => {
//     refs.newsList.innerHTML = '';
//     arrayNewsCard = [];

//     saveValuesFromCategoryNews(articles);
//      renderNewsList(arrayNewsCard);
//   })
// .catch()
//   .finally(hideLoader());
//}

function renderNewsList(arrayNewsCard) {
  const markup = arrayNewsCard.reduce((previousValue, article, index) => {
    orderedNumber += 1;

    if (index === 2) {
      return (
        createMarkupWidgetWeather() +
        previousValue +
        createNewsCard(article, orderedNumber)
      );
    }
    return createNewsCard(article, orderedNumber) + previousValue;
  }, '');
  updateNewsList(markup);
  orderedNumber = 0;
}

function updateNewsList(markup) {
  refs.newsList.innerHTML = markup;
  const deg = document.querySelector('.weather__degree');
  const value = document.querySelector('.weather__value');
  const city = document.querySelector('.weather__city');
  const day = document.querySelector('.weather__day');
  const year = document.querySelector('.weather__year');
  const imgWeather = document.querySelector('.weather__image');
  fillWeather(deg, value, city, day, year, imgWeather);
}
function createMarkupWidgetWeather() {
  return `<li id="weather" class="weather news__item location_weather">
<div class="weather__position">
    <span class="weather__degree"></span>
    <div class="weather__item">
      <span class="weather__value"></span>
      <p class="weather__location">
        <svg>
          <use href=${Sprite + '#location'}></use>
        </svg>
        <span class="weather__city"></span>
      </p>
    </div>
  </div>
  <img class="weather__image" />
  <div class="weather__date">
    <p class="weather__day"></p>
    <p class="weather__year"></p>
  </div>
  <a href="https://sinoptik.ua/" class="weather__link" target="_blank" rel="noreferrer noopener">weather for week</a>
</li>`;
}

function normolizeDate(date) {
  return date.slice(0, 10);
}

export {
  renderNewsList,
  updateNewList,
  createMarkupWidgetWeather,
  orderedNumber,
  renderPopularNews,
  saveValuesFromCategoryNews,
  saveValuesFromSearchNews,
  arrayNewsCard,
};
