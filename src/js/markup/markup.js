import { refs } from '../refs/refs';
import { hideLoader } from '../loader/loader';
import {
  getPopular,
  getCategoryList,
  getSearchArticle,
  getDataByCategory,
} from '../api/news';
import { createNewsCard, newsCardTextFormat } from '../newsCard/newsCard';

let arrayNewsCard = [];
const error =
  'https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1931.jpg';
let page = 2;
let orderedNumber = 0;

refs.form.addEventListener('submit', renderSearchNews);
refs.filterCategories.addEventListener('click', renderNewsCategory);

function saveValuesFromCategoryNews(articles) {
  console.log(articles);
  articles.map(article => {
    arrayNewsCard.push({
      title: article.title,
      media: `${
        article.multimedia === null ? error : `${article.multimedia[3].url}`
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

function saveValuesFromSearchNews(articles) {
  articles.map(article => {
    arrayNewsCard.push({
      title: article.headline.main,

      media: `${
        article.multimedia[0] === undefined
          ? error
          : `https://static01.nyt.com/${article.multimedia[0].url}`
      }`,

      url: article.url,
      published_date: article.pub_date,
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

function renderSearchNews(e) {
  e.preventDefault();

  refs.newsList.innerHTML = '';
  arrayNewsCard = [];

  const date = refs.celendarDate.dataset.time.replaceAll('-', '');
  console.log(date);

  const inputSearchValue = refs.form.elements.inputSearch.value;
  getSearchArticle(inputSearchValue, page, date)
    .then(articles => {
      // console.log(articles);
      saveValuesFromSearchNews(articles);
      renderNewsList(arrayNewsCard);
    })
    .catch()
    .finally(data => {
      hideLoader();
      // reset()
    });
}
function renderNewsCategory(e) {
  console.log(e.target);
  console.log(refs.filterOthers);
  if (e.target.nodeName !== 'BUTTON' || e.target === refs.filterOthers) {
    return;
  }
  const categoryName = e.target.dataset.category_name;

  console.log(categoryName);

  getDataByCategory(categoryName)
    .then(articles => {
      refs.newsList.innerHTML = '';
      arrayNewsCard = [];

      saveValuesFromCategoryNews(articles);
      renderNewsList(arrayNewsCard);
    })
    .catch()
    .finally(hideLoader());
}

function renderNewsList(arrayNewsCard) {
  const markup = arrayNewsCard.reduce((previousValue, article, index) => {
    orderedNumber += 1;
    if (index === 2) {
      return createMarkupWidgetWeather(orderedNumber) + previousValue;
    }

    return createNewsCard(article, orderedNumber) + previousValue;
  }, '');
  updateNewsList(markup);
  orderedNumber = 0;
}

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
  renderPopularNews,
};
