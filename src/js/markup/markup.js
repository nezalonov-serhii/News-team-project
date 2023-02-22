import { refs } from '../refs/refs';
import { hideLoader } from '../loader/loader';
import {
  getPopular,
  getCategoryList,
  getSearchArticle,
  getDataByCategory,
} from '../api/news';
import { createNewsCard } from '../markup/card';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fillWeather } from '../weather/weather';

let arrayNewsCard = [];

const error =
  'https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1931.jpg';
let page = 2;
let orderedNumber = 0;

refs.form.addEventListener('submit', renderSearchNews);

function saveValuesFromCategoryNews(articles) {
  console.log(articles);
  return articles.map(article => {
    return {
      id: article.slug_name,
      media: `${
        article.multimedia?.[3]?.url ? article.multimedia?.[3]?.url : error
      }`,
      title: article.title,
      abstract: newsCardTextFormat(article.abstract),

      section: article.section,
      published_date: article.published_date,
      url: article.url,
      uri: article.uri,
    };
  });
}

function saveValuesFromSearchNews(articles) {
  return articles.map(article => {
    return {
      id: article._id,
      media: `${
        article.multimedia?.[0]?.url
          ? `https://static01.nyt.com/${article.multimedia[0].url}`
          : error
      }`,
      title: article.headline.main,

      section: article.section_name,
      abstract: newsCardTextFormat(article.abstract),
      published_date: article.pub_date,
      url: article.url,
      uri: article.uri,
    };
  });
}

function saveValuesFromPopularNews(articles) {
  return articles.map(article => {
    return {
      id: article.id,
      media: `${
        article.media?.[0]?.['media-metadata']?.[2]?.url
          ? article.media?.[0]?.['media-metadata']?.[2]?.url
          : error
      }`,
      title: article.title,
      section: article.section,
      abstract: newsCardTextFormat(article.abstract),
      published_date: article.published_date,
      url: article.url,
      uri: article.uri,
    };
  });
}

function newsCardTextFormat(element) {
  let textFormat = element;
  if (textFormat.length > 80) {
    textFormat = element.slice(0, 80) + '...';
  }
  return textFormat;
}

function renderPopularNews(articles) {
  const cardArray = saveValuesFromPopularNews(articles);

  resetNewsList();
  renderNewsList(cardArray);
}

function renderSearchNews(e) {
  e.preventDefault();
  resetNewsList();

  const date = refs.celendarDate.dataset.time.replaceAll('-', '');

  const inputSearchValue = refs.form.elements.inputSearch.value;

  getSearchArticle(inputSearchValue, page, date)
    .then(articles => {
      const cardArray = saveValuesFromSearchNews(articles);
      renderNewsList(cardArray);
    })
    .catch()
    .finally(data => {
      hideLoader();
    });
}

function renderNewsCategory(e) {
  console.log(e.target);
  console.log(refs.filterOthers);
  if (e.target.nodeName !== 'BUTTON' || e.target === refs.filterOthers) {
    return;
  }
  const categoryName = e.target.dataset.category_name;

  getDataByCategory(categoryName)
    .then(articles => {
      refs.newsList.innerHTML = '';
      const cardArray = saveValuesFromCategoryNews(articles);

      if (cardArray.length < 1) {
        Notify.failure('Error: No news found');
        return;
      }

      renderNewsList(cardArray);
    })
    .catch()
    .finally(hideLoader());
}

async function renderNewsList(arrayNewsCard) {
  let markup = arrayNewsCard.map(item => createNewsCard(item)).join('');
  markup += await fillWeather();
  // updateNewsList(markup);
  refs.newsList.innerHTML = markup;
}

// function updateNewsList(markup) {
//   refs.newsList.innerHTML = markup;
//   const deg = document.querySelector('.weather__degree');
//   const value = document.querySelector('.weather__value');
//   const city = document.querySelector('.weather__city');
//   const day = document.querySelector('.weather__day');
//   const year = document.querySelector('.weather__year');
//   const imgWeather = document.querySelector('.weather__image');
//   fillWeather(deg, value, city, day, year, imgWeather);
// }

function resetNewsList() {
  refs.newsList.innerHTML = '';
}

function createMarkupWidgetWeather() {
  return `<li id="weather" class="weather news__item location_weather">
<div class="weather__position">
    <span class="weather__degree"></span>
    <div class="weather__item">
      <span class="weather__value"></span>
      <p class="weather__location">
        <svg>
          <use href="./images/sprite.svg#location"></use>
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
  updateNewsList,
  createMarkupWidgetWeather,
  orderedNumber,
  renderPopularNews,
  saveValuesFromCategoryNews,
  renderNewsCategory,
  arrayNewsCard,
};


