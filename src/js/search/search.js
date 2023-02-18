import {
  getPopular,
  getCategoryList,
  getSearchArticle,
  getDataByCategory,
} from '../api/news';

getPopular()
  .then(data => {
    console.log(data);
  })
  .catch(error => console.log(error));

getCategoryList()
  .then(data => console.log(data))
  .catch(error => {
    console.log(error);
  });

getDataByCategory('Crosswords & Games')
  .then(data => console.log(data))
  .catch(error => console.log(error));

getSearchArticle('car', 1)
  .then(data => console.log(data))
  .catch(error => console.log(error));