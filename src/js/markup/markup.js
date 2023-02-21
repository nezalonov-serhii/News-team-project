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

const error =
  'https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1931.jpg';
let page = 2;
let orderedNumber = 0;

refs.form.addEventListener('submit', renderSearchNews);
refs.filterCategories.addEventListener('click', renderNewsCategory);

function saveValuesFromCategoryNews(articles) {
  console.log(articles);
  return articles.map(article => {
    return {
      id: article.id,
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

function renderNewsList(arrayNewsCard) {
  const markup = arrayNewsCard.reduce((previousValue, article, index) => {
    orderedNumber += 1;
    if (index === 2) {
      createMarkupWidgetWeather(orderedNumber) + previousValue;
    }

    return createNewsCard(article) + previousValue;
  }, '');

  updateNewsList(markup);
  orderedNumber = 0;
}

function updateNewsList(markup) {
  refs.newsList.innerHTML = markup;
}

function resetNewsList() {
  refs.newsList.innerHTML = '';
}

function createMarkupWidgetWeather() {
  return `<li class =" news__item location_weather"  ><div class=" news__weather"><p class = "text_weather">Weather<p></div></li>`;
}

export {
  renderNewsList,
  updateNewsList,
  createMarkupWidgetWeather,
  orderedNumber,
  renderPopularNews,
};
