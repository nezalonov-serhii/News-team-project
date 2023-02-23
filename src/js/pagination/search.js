import { getSearchArticle } from '../api/news';
import { hideLoader } from '../loader/loader';
import { refs } from '../refs/refs';
import { saveValuesFromSearchNews } from '../markup/markup';
import { scrollTop } from './function';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('.input');

let totalPage = 0;
let currentPage = 0;
let newsPerPage = 0;
let rightAmount = [];

refs.form.addEventListener('submit', onInput);

if (window.matchMedia('(max-width: 767.98px)').matches) {
  newsPerPage = 4;
} else if (window.matchMedia('(min-width: 768px)').matches) {
  newsPerPage = 7;
} else if (window.matchMedia('(min-width: 1280px)').matches) {
  newsPerPage = 8;
}

function onInput(e) {
  e.preventDefault();

  currentPage = 0;
  refs.newsList.innerHTML = '';
  refs.nextBtn.disabled = false;

  let inputValue = input.value.trim();
  if (inputValue !== '') {
    const date = refs.celendarDate.dataset.time.replaceAll('-', '');
    getSearchArticle(inputValue, date)
      .then(news => {
        console.log(news[0] === undefined);

        refs.errorSearch.classList.add('is-hidden');
        if (news[0] === undefined) {
          refs.errorSearch.classList.remove('is-hidden');
          throw new Error('Not found');
        }

        refs.filterCategories.addEventListener('click', resetPagination);
        refs.form.addEventListener('submit', resetPagination);
        refs.prevBtn.addEventListener('click', prevBtnClick);
        refs.nextBtn.addEventListener('click', nextBtnClick);
        refs.pgContainer.addEventListener('click', clickOnPage);

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

        function prevBtnClick() {
          currentPage--;

          getRightAmount();
          saveValuesFromSearchNews(rightAmount);
          renderPage(currentPage, totalPage);
          scrollTop();

          if (currentPage < totalPage) refs.nextBtn.disabled = false;
        }

        function nextBtnClick() {
          currentPage++;

          getRightAmount();
          saveValuesFromSearchNews(rightAmount);
          renderPage(currentPage, totalPage);
          scrollTop();

          if (currentPage > 0) refs.prevBtn.disabled = false;
        }
        function clickOnPage(e) {
          if (
            e.target.nodeName === 'UL' ||
            e.target.classList.contains('active')
          )
            return;

          currentPage = +e.target.getAttribute('data-page');

          getRightAmount();
          saveValuesFromSearchNews(rightAmount);
          renderPage(currentPage, totalPage);
          scrollTop();

          if (currentPage > 0) refs.prevBtn.disabled = false;
          else refs.prevBtn.disabled = true;

          if (currentPage > totalPage - 2) {
            refs.nextBtn.disabled = true;
          } else refs.nextBtn.disabled = false;
        }
        function resetPagination() {
          refs.pgContainer.removeEventListener('click', clickOnPage);
          refs.nextBtn.removeEventListener('click', nextBtnClick);
          refs.prevBtn.removeEventListener('click', prevBtnClick);

          refs.prevBtn.disabled = true;
          refs.nextBtn.disabled = false;
        }
      })
      .catch(error => {
        Notify.failure('Error: ' + error.message);
      })
      .finally(fin => {
        e.target.reset();
        hideLoader();
      });

    function renderPage(currentPage) {
      let marcup = '';

      if (currentPage >= totalPage - 1) {
        const allBtns = document.querySelectorAll('.pg-item');
        allBtns[allBtns.length - 1].classList.add('active');
        allBtns[allBtns.length - 2].classList.remove('active');
        refs.nextBtn.disabled = true;
        // return;
      }
      if (currentPage === 0) {
        refs.prevBtn.disabled = true;
      }

      if (totalPage < 4) {
        for (let i = 0; i < totalPage; i += 1) {
          if (i !== currentPage) {
            marcup += `<li class="pg-item" data-page="${i}">${i + 1}</li>`;
          } else {
            marcup += `<li class="pg-item active" data-page="${i}">${
              i + 1
            }</li>`;
          }
        }
      } else if (currentPage < 2) {
        for (let i = 0; i < totalPage; i += 1) {
          if (i !== currentPage) {
            marcup += `<li class="pg-item" data-page="${i}">${i + 1}</li>`;
          } else if (i < rightAmount.length) {
            marcup += `<li class="pg-item active" data-page="${i}">${
              i + 1
            }</li>`;
          }
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 1; i += 1) {
          if (i !== currentPage) {
            marcup += `<li class="pg-item" data-page="${i}">${i + 1}</li>`;
          } else {
            marcup += `<li class="pg-item active" data-page="${i}">${
              i + 1
            }</li>`;
          }
        }
      }
      refs.pgContainer.innerHTML = marcup;
    }
  }
}
