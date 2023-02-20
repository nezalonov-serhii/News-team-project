const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
// const pageBtns = document.querySelectorAll('.page-btn');

// поточна сторінка
let currentPage = 1;

// кількість новин на сторінці
const newsPerPage = 20;

// обробка подій на кнопки "Prev" та "Next"
prevBtn.addEventListener('click', () => {
  currentPage--;
  loadNews(currentPage);
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  loadNews(currentPage);
});
