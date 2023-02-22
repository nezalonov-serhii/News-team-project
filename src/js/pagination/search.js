import { getSearchArticle } from '../api/news';
import { hideLoader } from '../loader/loader';
import { refs } from '../refs/refs';
import { saveValuesFromSearchNews, renderNewsList } from '../markup/markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.search');
const input = document.querySelector('.input');

let totalPage = 0;
let currentPage = 0;
let newsPerPage = 0;
let rightAmount = [];

form.addEventListener('submit', onInput);

if (window.matchMedia('(max-width: 767.98px)').matches) {
  newsPerPage = 4;
} else if (window.matchMedia('(min-width: 768px)').matches) {
  newsPerPage = 7;
} else if (window.matchMedia('(min-width: 1280px)').matches) {
  newsPerPage = 8;
}

function onInput(e) {
  e.preventDefault();
  let inputValue = input.value.trim();
  if (inputValue !== '') {
    const date = refs.celendarDate.dataset.time.replaceAll('-', '');
    getSearchArticle(inputValue, date)
      .then(news => {
        // renderNewsList(arrayNewsCard);

        totalPage = Math.ceil(news.length / newsPerPage);

        function getRightAmount() {
          rightAmount = news.slice(
            currentPage * newsPerPage,
            currentPage * newsPerPage + newsPerPage
          );
        }

        getRightAmount();
        saveValuesFromSearchNews(rightAmount);

        renderPage(currentPage, totalPage);
        renderNewsList(arrayNewsCard);

        refs.prevBtn.addEventListener('click', e => {
          currentPage--;

          getRightAmount();
          saveValuesFromSearchNews(rightAmount);
          renderNewsList(arrayNewsCard);

          prevActive();
          if (currentPage < totalPage) refs.nextBtn.disabled = false;
        });

        refs.nextBtn.addEventListener('click', e => {
          refs.newsList.innerHTML = '';
          arrayNewsCard = [];
          currentPage++;

          getRightAmount();
          saveValuesFromSearchNews(rightAmount);
          renderNewsList(arrayNewsCard);
          nextActive();

          if (currentPage > 0) refs.prevBtn.disabled = false;
        });

        function prevActive() {
          renderPage(currentPage);
        }
        function nextActive() {
          renderPage(currentPage);
        }

        // function nextActive() {
        //   renderPage(totalPage, currentPage, news);
        // }

        refs.pgContainer.addEventListener('click', clickOnPage);

        function clickOnPage(e) {
          if (
            e.target.nodeName === 'UL' ||
            e.target.classList.contains('active')
          )
            return;

          currentPage = +e.target.getAttribute('data-page');

          getRightAmount();
          saveValuesFromSearchNews(rightAmount);
          renderNewsList(arrayNewsCard);
          renderPage(currentPage);

          if (currentPage > 0) refs.prevBtn.disabled = false;
          else refs.prevBtn.disabled = true;

          if (currentPage > totalPage) {
            refs.nextBtn.disabled = true;
          } else refs.nextBtn.disabled = false;
        }
      })
      .catch(error => Notify.failure('Error: ' + error.message))
      .finally(hideLoader);

    function renderPage(currentPage) {
      let marcup = '';

      if (window.matchMedia('(max-width: 768px)').matches) {
        if (currentPage >= totalPage - 1) {
          const allBtns = document.querySelectorAll('.pg-item');
          allBtns[allBtns.length - 1].classList.add('active');
          allBtns[allBtns.length - 2].classList.remove('active');
          refs.nextBtn.disabled = true;
          return;
        }

        if (currentPage === 0) {
          refs.prevBtn.disabled = true;
        }
        if (currentPage <= 3) {
          for (let i = 0; i < totalPage; i += 1) {
            if (i !== currentPage) {
              marcup += `<li class="pg-item" data-page="${i}"><a>${
                i + 1
              }</a></li>`;
            } else if (i < rightAmount.length) {
              marcup += `<li class="pg-item active" data-page="${i}"><a>${
                i + 1
              }</a></li>`;
            }
          }
        } else if (currentPage > 3) {
          for (let i = currentPage; i <= totalPage; i += 1) {
            if (i !== currentPage) {
              marcup += `<li class="pg-item" data-page="${i}"><a>${
                i + 1
              }</a></li>`;
            } else {
              marcup += `<li class="pg-item active" data-page="${i}"><a>${
                i + 1
              }</a></li>`;
            }
          }
        }
        refs.pgContainer.innerHTML = marcup;
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        if (currentPage === totalPage - 1) {
          refs.nextBtn.disabled = true;
          return;
        }
        if (currentPage === 0) {
          refs.prevBtn.disabled = true;
        }

        if (currentPage >= totalPage) {
          const allBtns = document.querySelectorAll('.pg-item');
          console.log(allBtns);
          allBtns[allBtns.length - 1].classList.add('active');
          allBtns[allBtns.length - 2].classList.remove('active');
          return;
        }
        if (currentPage < 3) {
          for (let i = 0; i < 4; i += 1) {
            if (i !== currentPage) {
              marcup += `<li class="pg-item" data-page="${i}"><a>${
                i + 1
              }</a></li>`;
            } else if (i < rightAmount.length) {
              marcup += `<li class="pg-item active" data-page="${i}"><a>${
                i + 1
              }</a></li>`;
            }
          }
        } else if (currentPage >= 3) {
          for (let i = currentPage - 2; i <= currentPage + 1; i += 1) {
            if (i !== currentPage) {
              marcup += `<li class="pg-item" data-page="${i}"><a>${
                i + 1
              }</a></li>`;
            } else {
              marcup += `<li class="pg-item active" data-page="${i}"><a>${
                i + 1
              }</a></li>`;
            }
          }
        }
        refs.pgContainer.innerHTML = marcup;
      }
    }
  }
}
