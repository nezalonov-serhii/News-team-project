import { getPopular, getSearchArticle } from '../api/news';
import { hideLoader } from '../loader/loader';
import { refs } from '../refs/refs';
refs;
// getPopular()
//   .then(data => {
//     // console.log(data);
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

const form = document.querySelector('.search');
const input = document.querySelector('.input');

form.addEventListener('submit', onInput);

function onInput(e) {
  e.preventDefault();
  let inputValue = input.value.trim();
  let date = refs.celendarDate.getAttribute('data-time');
  console.log(date);
  if (inputValue === '') {
    console.log(getSearchArticle(inputValue, date));
  }
}
