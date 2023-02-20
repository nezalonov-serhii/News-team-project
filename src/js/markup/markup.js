import { refs } from '../refs/refs';
import { hideLoader } from '../loader/loader';
import {
  getPopular,
  getCategoryList,
  getSearchArticle,
  getDataByCategory,
} from '../api/news';
import { createNewsCard, newsCardTextFormat } from '../newsCard/newsCard';

const arrayNewsCard = [];
const error = './../images/error-tablet.png';
let page = 2;
let orderedNumber = 0;

refs.form.addEventListener('submit', renderSearchNews);
refs.filterCategories.addEventListener('click', renderNewsCategory);

renderPopularNews();

function saveValuesFromCategoryNews(articles) {
  console.log(articles);
  articles.map(article => {
    arrayNewsCard.push({
      title: article.title,
      media: article.multimedia[0].url,
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
    console.log(article.multimedia[0].url);
    arrayNewsCard.push({
      title: article.headline.main,
      media: '`https://static01.nyt.com/+${article.multimedia[0].url }`',
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
function renderPopularNews() {
  getPopular()
    .then(articles => {
      saveValuesFromPopularNews(articles);
      renderNewsList(arrayNewsCard);
    })
    .catch()
    .finally(hideLoader());
}

function renderSearchNews(e) {
  e.preventDefault();
  const inputSearchValue = refs.form.elements.inputSearch.value;
  getSearchArticle(inputSearchValue, page)
    .then(articles => {
      console.log(articles);
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
  if (e.target.nodeName !== 'BUTTON' && e.target === refs.filterOthers) {
    return;
  }
  const categoryName = e.target.dataset.category_name;

  getDataByCategory(categoryName)
    .then(articles => {
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
};
