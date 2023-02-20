import {
  getPopular,
  getCategoryList,
  getSearchArticle,
  getDataByCategory,
} from '../api/news';
const input = document.querySelector('.input');


input.addEventListener('submit', onInput);


 getPopular()
  .then(data => {
    console.log(data);
  })
  .catch(error => console.log(error));


// getCategoryList()
//   .then(data => console.log(data))
//   .catch(error => {
//     console.log(error);
//   });

// getDataByCategory('Crosswords & Games')
//   .then(data => console.log(data))
//   .catch(error => console.log(error));


  function onInput(e){
    e.preventDefault();
    const inputValue = input.value.trim();
    if(inputValue === ""){
      return
    }
getSearchArticle('car', 1)
  .then(data => console.log(data))
  .catch(error => console.log(error));

  }

