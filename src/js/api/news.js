import axios from "axios";

const KEY = 'api-key=ccA9QsXbvrHhGuvowEcHjyxEU2jAukPO';
const BASE_URL = 'https://api.nytimes.com/svc';

export async function newsSearch() { 
    const response = axios.get(`${BASE_URL}?key=${KEY}`);
    return await response;
      
  }

  export async function getCategoryList() {
    const response = axios.get(
      `${BASE_URL}//news/v3/content/section-list.json?${KEY}`)
      return await response;
    
  }

  export async function getDataByCategory(newValue) {
    const response = axios.get(
      `${BASE_URL}/news/v3/content/all/${newValue}.json?${KEY}``${BASE_URL}/news/v3/content/all/${newValue}.json?${KEY}`)
      return await response;
  }

  export async function getSearchArticle(value, page) {

    const response = axios.get(
      `${BASE_URL}/search/v2/articlesearch.json?q=${value}&page=${page}&${KEY}${dateForUrl}`)
      return await response;
  }

