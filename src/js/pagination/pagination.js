// const prevBtn = document.querySelector('#prev-btn');
// const nextBtn = document.querySelector('#next-btn');
// // const pageBtns = document.querySelectorAll('.page-btn');

// // поточна сторінка
// let currentPage = 1;

// // кількість новин на сторінці
// const newsPerPage = 20;

// // обробка подій на кнопки "Prev" та "Next"
// prevBtn.addEventListener('click', () => {
//   currentPage--;
//   loadNews(currentPage);
// });

// nextBtn.addEventListener('click', () => {
//   currentPage++;
//   loadNews(currentPage);
// });
<<<<<<< Updated upstream
=======
// const prevBtn = document.querySelector('#prev-btn');
// const nextBtn = document.querySelector('#next-btn');
// // const pageBtns = document.querySelectorAll('.page-btn');

// // поточна сторінка
// let currentPage = 1;

// // кількість новин на сторінці
// const newsPerPage = 20;

// // обробка подій на кнопки "Prev" та "Next"
// prevBtn.addEventListener('click', () => {
//   currentPage--;
//   loadNews(currentPage);
// });

// nextBtn.addEventListener('click', () => {
//   currentPage++;
//   loadNews(currentPage);
// });
>>>>>>> Stashed changes


import { getPopular, getSearchArticle } from '../api/news';
const itemsPerPage = window.matchMedia('(max-width: 768px)').matches
  ? 6
  : window.matchMedia('(max-width: 1024px)').matches
  ? 8
  : 10;

let currentPage = 1;
function loadNews(data, page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const itemsToShow = data.slice(start, end);
  // відображення елементів на поточній сторінці
}
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
prevBtn.disabled = true;
nextBtn.disabled = false;
getPopular()
  .then(data => {
    prevBtn.addEventListener('click', () => {
    
    if (currentPage > 1) {
      currentPage--;
      loadNews(data, currentPage, itemsPerPage);
      }
      if (currentPage === 1) {
        prevBtn.disabled = true;
      }
        nextBtn.disabled = false;
  });
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        loadNews(data, currentPage, itemsPerPage);

       if (currentPage === totalPages) {
          nextBtn.disabled = true;
        }
        prevBtn.disabled = false;
      }
    });
    // console.log(data);
    totalPages = Math.ceil(data.length / itemsPerPage); // визначення загальної кількості сторінок
    loadNews(data, currentPage, itemsPerPage); // відображення елементів на першій сторінці
     if (totalPages === 1) {
       nextBtn.disabled = true;
     }
    console.log(data);
  })
  .catch(error => console.log(error));
console.log(itemsPerPage);

function loadNews(data, page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const itemsToShow = data.slice(start, end);
<<<<<<< Updated upstream

  const newsList = document.getElementById('news-list');
  newsList.innerHTML = '';

  itemsToShow.forEach(item => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');
    newsItem.innerHTML = `
      <div class="news-item__image">
        <img src="${item.urlToImage}" alt="">
      </div>
      <div class="news-item__content">
        <h2 class="news-item__title">${item.title}</h2>
        <p class="news-item__description">${item.description}</p>
        <a class="news-item__link" href="${item.url}" target="_blank">Read more</a>
      </div>
    `;
    newsList.appendChild(newsItem);
  });
}
=======
}

//   const newsList = document.getElementById('news-list');
//   newsList.innerHTML = '';

//   itemsToShow.forEach(item => {
//     const newsItem = document.createElement('div');
//     newsItem.classList.add('news-item');
//     newsItem.innerHTML = `
//       <div class="news-item__image">
//         <img src="${item.urlToImage}" alt="">
//       </div>
//       <div class="news-item__content">
//         <h2 class="news-item__title">${item.title}</h2>
//         <p class="news-item__description">${item.description}</p>
//         <a class="news-item__link" href="${item.url}" target="_blank">Read more</a>
//       </div>
//     `;
//     newsList.appendChild(newsItem);
//   });
// }
>>>>>>> Stashed changes
