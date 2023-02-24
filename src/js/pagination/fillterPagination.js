import { getDataByCategory } from '../api/news';
import { hideLoader } from '../loader/loader';
import { saveValuesFromCategoryNews } from '../markup/markup';
import { scrollTop } from './function';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { refs } from '../refs/refs';

let totalPage = 0;
let currentPage = 0;
let newsPerPage = 0;
let rightAmount = [];

refs.filterCategories.addEventListener('click', renderNewsCategory);

if (window.matchMedia('(max-width: 767.98px)').matches) {
  newsPerPage = 4;
} else if (window.matchMedia('(min-width: 1280px)').matches) {
  newsPerPage = 8;
} else if (window.matchMedia('(min-width: 768px)').matches) {
  newsPerPage = 7;
}

function renderNewsCategory(e) {
  if (e.target.nodeName !== 'BUTTON' || e.target === refs.filterOthers) {
    return;
  }

  const categoryName = e.target.dataset.category_name;

  getDataByCategory(categoryName)
    .then(news => {
      refs.newsList.innerHTML = '';
      currentPage = 0;
      refs.nextBtn.disabled = false;

      refs.form.addEventListener('submit', resetPagination);
      refs.filterCategories.addEventListener('click', resetPagination);
      refs.pgContainer.addEventListener('click', clickOnPage);
      refs.prevBtn.addEventListener('click', prevBtnClick);
      refs.nextBtn.addEventListener('click', nextBtnClick);

      totalPage = Math.ceil(news.length / newsPerPage);

      function getRightAmount() {
        rightAmount = news.slice(
          currentPage * newsPerPage,
          currentPage * newsPerPage + newsPerPage
        );
      }

      getRightAmount();
      saveValuesFromCategoryNews(rightAmount);
      renderPage(currentPage);

      function prevBtnClick() {
        currentPage--;

        getRightAmount();
        saveValuesFromCategoryNews(rightAmount);
        renderPage(currentPage);
        scrollTop();

        if (currentPage < totalPage) refs.nextBtn.disabled = false;
      }

      function nextBtnClick() {
        currentPage++;

        getRightAmount();
        saveValuesFromCategoryNews(rightAmount);
        renderPage(currentPage);
        scrollTop();

        if (currentPage > 0) refs.prevBtn.disabled = false;
      }

      function clickOnPage(e) {
        if (e.target.nodeName === 'UL' || e.target.classList.contains('active'))
          return;

        currentPage = +e.target.getAttribute('data-page');

        renderPage(currentPage);
        getRightAmount();
        saveValuesFromCategoryNews(rightAmount);
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
        currentPage = 0;
      }
    })
    .catch(error => Notify.failure('Error: ' + error.message))
    .finally(hideLoader);

  function renderPage(currentPage) {
    let marcup = '';

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

    if (totalPage < 4) {
      for (let i = 0; i < totalPage; i += 1) {
        if (i !== currentPage) {
          marcup += `<li class="pg-item" data-page="${i}">${i + 1}</li>`;
        } else {
          marcup += `<li class="pg-item active" data-page="${i}">${i + 1}</li>`;
        }
      }
    } else if (currentPage < 2) {
      for (let i = 0; i < 4; i += 1) {
        if (i !== currentPage) {
          marcup += `<li class="pg-item" data-page="${i}">${i + 1}</li>`;
        } else if (i < rightAmount.length) {
          marcup += `<li class="pg-item active" data-page="${i}">${i + 1}</li>`;
        }
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 1; i += 1) {
        if (i !== currentPage) {
          marcup += `<li class="pg-item" data-page="${i}">${i + 1}</li>`;
        } else {
          marcup += `<li class="pg-item active" data-page="${i}">${i + 1}</li>`;
        }
      }
    }
    refs.pgContainer.innerHTML = marcup;
  }
}
