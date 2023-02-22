import { getDataByCategory } from '../api/news';
import { hideLoader } from '../loader/loader';
import {
  saveValuesFromCategoryNews,
  renderNewsList,
  arrayNewsCard,
} from '../markup/markup';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { refs } from '../refs/refs';

let totalPage = 0;
let currentPage = 0;
let newsPerPage = 0;
let rightAmount = [];

refs.filterCategories.addEventListener('click', renderNewsCategory);

if (window.matchMedia('(max-width: 767.98px)').matches) {
  newsPerPage = 4;
} else if (window.matchMedia('(min-width: 768px)').matches) {
  newsPerPage = 7;
} else if (window.matchMedia('(min-width: 1280px)').matches) {
  newsPerPage = 8;
}

function renderNewsCategory(e) {
  if (e.target.nodeName !== 'BUTTON' || e.target === refs.filterOthers) {
    return;
  }

  const categoryName = e.target.dataset.category_name;

  getDataByCategory(categoryName)
    .then(news => {
      console.log(news);
      refs.filterCategories.addEventListener('click', removeListner);

      function removeListner() {
        refs.pgContainer.removeEventListener('click', clickOnPage);
        refs.nextBtn.removeEventListener('click', nextBtnClick);
        refs.pgContainer.removeEventListener('click', prevBtnClick);

        refs.prevBtn.disabled = true;
        refs.nextBtn.disabled = false;
        currentPage = 0;
      }

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

      renderNewsList(arrayNewsCard);

      refs.prevBtn.addEventListener('click', prevBtnClick);

      function prevBtnClick() {
        currentPage--;

        getRightAmount();
        saveValuesFromCategoryNews(rightAmount);
        renderNewsList(arrayNewsCard);

        prevActive();
        if (currentPage < totalPage) refs.nextBtn.disabled = false;
      }

      refs.nextBtn.addEventListener('click', nextBtnClick);

      function nextBtnClick() {
        currentPage++;

        getRightAmount();
        saveValuesFromCategoryNews(rightAmount);
        renderNewsList(arrayNewsCard);
        nextActive();
        if (currentPage > 0) refs.prevBtn.disabled = false;
      }

      function prevActive() {
        renderPage(currentPage);
      }
      function nextActive() {
        renderPage(currentPage);
      }

      refs.pgContainer.addEventListener('click', clickOnPage);

      function clickOnPage(e) {
        if (e.target.nodeName === 'UL' || e.target.classList.contains('active'))
          return;

        currentPage = +e.target.getAttribute('data-page');

        renderPage(currentPage);
        getRightAmount();
        saveValuesFromCategoryNews(rightAmount);
        renderNewsList(arrayNewsCard);

        if (currentPage > 0) refs.prevBtn.disabled = false;
        else refs.prevBtn.disabled = true;

        if (currentPage > totalPage - 2) {
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
      if (totalPage < 4) {
        for (let i = 0; i < totalPage; i += 1) {
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
      } else if (currentPage < 3) {
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
    } else if (window.matchMedia('(min-width: 768px)').matches) {
      if (currentPage === totalPage - 1) {
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
            marcup += `<li class="pg-item" data-page="${i}"><a>${
              i + 1
            }</a></li>`;
          } else {
            marcup += `<li class="pg-item active" data-page="${i}"><a>${
              i + 1
            }</a></li>`;
          }
        }
      } else if (currentPage < 3) {
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
