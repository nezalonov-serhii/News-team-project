// import { getPopular, getSearchArticle } from '../api/news';
import { hideLoader } from '../loader/loader';


const form = document.querySelector('.search');
const input = document.querySelector('.input');


form.addEventListener('submit', onInput);

// getPopular()
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => console.log(error));

// getCategoryList()
//   .then(data => console.log(data))
//   .catch(error => {
//     console.log(error);
//   });

// getDataByCategory('Crosswords & Games')
//   .then(data => console.log(data))
//   .catch(error => console.log(error));

function onInput(e) {
  e.preventDefault();
  const inputValue = input.value.trim();
  if (inputValue === '') {
    return;
  }

  form.reset();

  getSearchArticle(inputValue)
    .then(data => console.log(data))
    .catch(error => console.log(error))
    .finally(hideLoader);
}

