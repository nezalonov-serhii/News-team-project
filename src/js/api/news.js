import { showLoader } from '../loader/loader';

const KEY = 'api-key=ccA9QsXbvrHhGuvowEcHjyxEU2jAukPO';
const BASE_URL = 'https://api.nytimes.com/svc';

async function getPopular() {
  const articleFetch = await fetch(
    `${BASE_URL}/mostpopular/v2/viewed/1.json?${KEY}`
  );

  if (articleFetch.ok) {
    const popular = await articleFetch.json();
    return popular.results;
  }
  throw new Error(articleFetch.statusText);
}

async function getCategoryList() {
  showLoader();
  const categoryList = await fetch(
    `${BASE_URL}//news/v3/content/section-list.json?${KEY}`
  );

  if (categoryList.ok) {
    const categories = await categoryList.json();
    return categories.results;
  }

  throw new Error(categoryList.statusText);
}

async function getDataByCategory(value) {
  showLoader();
  let normalazeValue = value.toLowerCase();
  let newValue = encodeURIComponent(normalazeValue);

  const data = await fetch(
    `${BASE_URL}/news/v3/content/all/${newValue}.json?${KEY}&limit=100`
  );
  if (data.ok) {
    const articles = await data.json();

    console.log(articles.results);
    return articles.results;
  }

  throw new Error(data.statusText);
}

async function getSearchArticle(value, date) {
  showLoader();
  let dateUrl = '';
  if (date !== '') {
    dateUrl = `&begin_date=${date}&end_date=${date}`;
  }

  const articleFetch = await fetch(
    `${BASE_URL}/search/v2/articlesearch.json?q=${value}&${KEY}${dateUrl}`
  );

  if (articleFetch.ok) {
    const articles = await articleFetch.json();

    return articles.response.docs;
  }

  throw new Error(articleFetch.statusText);
}

export { getPopular, getCategoryList, getSearchArticle, getDataByCategory };
