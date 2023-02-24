import { refs } from '../refs/refs';
import Sprite from '../../images/sprite.svg';
import { fillWeather } from '../weather/weather';
import { newsCardTextFormat } from '../markup/card';

import { createNewsCard } from '../markup/card';

const error =
  'https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1931.jpg';

let orderedNumber = 0;

function saveValuesFromCategoryNews(articles) {
  clearNewsList();

  const arrNews = articles.map(article => {
    return {
      title: article.title,
      media: `${
        article.multimedia === null ? error : `${article.multimedia[2].url}`
      }`,
      url: article.url,
      published_date: `${normolizeDate(article.published_date)}`,
      section: article.section,
      abstract: newsCardTextFormat(article.abstract),
      id: article.url,
      uri: article.uri,
    };
  });
  renderNewsList(arrNews);
}

function saveValuesFromSearchNews(articles) {
  clearNewsList();

  const arrNews = articles.map(article => {
    return {
      title: article.headline.main,

      media: `${
        article.multimedia[0] === undefined
          ? error
          : `https://static01.nyt.com/${article.multimedia[0].url}`
      }`,

      url: article.url,
      published_date: `${normolizeDate(article.pub_date)}`,
      section: article.section_name,
      abstract: newsCardTextFormat(article.abstract),
      id: article._id,
      uri: article.uri,
    };
  });
  renderNewsList(arrNews);
}
function saveValuesFromPopularNews(articles) {
  clearNewsList();

  const arrNews = articles.map(article => {
    return {
      title: article.title,
      media: `${
        article.media[0] === undefined
          ? error
          : article.media[0]['media-metadata'][2].url
      }`,
      url: article.url,
      published_date: article.published_date,
      section: article.section,
      abstract: newsCardTextFormat(article.abstract),
      id: article.id,
      uri: article.uri,
    };
  });

  renderNewsList(arrNews);
}

function renderNewsList(arrayNewsCard) {
  const markup = arrayNewsCard.reduce((previousValue, article, index) => {
    orderedNumber += 1;

    if (index === 0) {
      return (
        previousValue +
        createNewsCard(article, orderedNumber) +
        createMarkupWidgetWeather()
      );
    }
    return createNewsCard(article, orderedNumber) + previousValue;
  }, '');
  const widgetWeather = updateNewsList(markup);
  fillWeather(widgetWeather);
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
  <img class="weather__image" alt="weather status"/>
  <div class="weather__date">
    <p class="weather__day"></p>
    <p class="weather__year"></p>
  </div>
  <a href="https://sinoptik.ua/" class="weather__btn" target="_blank" rel="noreferrer noopener"><span class="weather__text">weather for week</span></a>
</li>`;
}

function normolizeDate(date) {
  return date.slice(0, 10);
}

function clearNewsList() {
  refs.newsList.innerHTML = '';
}

const mainNewsList = refs.newsList;

function updateNewsList(markup) {
  mainNewsList.innerHTML = markup;
  const valueOfWeather = {
    deg: mainNewsList.querySelector('.weather__degree'),
    value: mainNewsList.querySelector('.weather__value'),
    city: mainNewsList.querySelector('.weather__city'),
    day: mainNewsList.querySelector('.weather__day'),
    year: mainNewsList.querySelector('.weather__year'),
    imgWeather: mainNewsList.querySelector('.weather__image'),
  };
  return valueOfWeather;
}

export {
  renderNewsList,
  createMarkupWidgetWeather,
  orderedNumber,
  saveValuesFromCategoryNews,
  saveValuesFromSearchNews,
  saveValuesFromPopularNews,
};
