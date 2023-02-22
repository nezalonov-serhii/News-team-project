import { getPopular } from '../api/news';
import { renderPopularNews } from '../markup/markup';
import { refs } from '../refs/refs';
import { hideLoader } from '../loader/loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let totalPage = 0;
let currentPage = 0;
let newsPerPage = 0;
let rightAmount = [];

if (window.matchMedia('(max-width: 767.98px)').matches) {
  newsPerPage = 4;
} else if (window.matchMedia('(min-width: 1280px)').matches) {
  newsPerPage = 8;
} else if (window.matchMedia('(min-width: 768px)').matches) {
  newsPerPage = 7;
}

getPopular()
  .then(news => {
    totalPage = Math.ceil(news.length / newsPerPage);

    refs.filterCategories.addEventListener('click', removeListner);

    function removeListner() {
      refs.pgContainer.removeEventListener('click', clickOnPage);
      refs.nextBtn.removeEventListener('click', nextBtnClick);
      refs.prevBtn.removeEventListener('click', prevBtnClick);

      refs.prevBtn.disabled = true;
      refs.nextBtn.disabled = false;
      currentPage = 0;
    }

    function getRightAmount() {
      rightAmount = news.slice(
        currentPage * newsPerPage,
        currentPage * newsPerPage + newsPerPage
      );
    }

    getRightAmount();

    renderPage(currentPage);

    renderPopularNews(rightAmount);

    refs.prevBtn.addEventListener('click', prevBtnClick);

    function prevBtnClick() {
      currentPage--;

      getRightAmount();
      renderPopularNews(rightAmount);

      prevActive();
      if (currentPage < totalPage) refs.nextBtn.disabled = false;
    }

    refs.nextBtn.addEventListener('click', nextBtnClick);

    function nextBtnClick() {
      currentPage++;

      getRightAmount();
      renderPopularNews(rightAmount);
      nextActive();

      if (currentPage > 0) refs.prevBtn.disabled = false;
    }

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
      if (e.target.nodeName === 'UL' || e.target.classList.contains('active'))
        return;

      currentPage = +e.target.getAttribute('data-page');

      renderPage(currentPage);
      getRightAmount();
      renderPopularNews(rightAmount);

      if (currentPage > 0) refs.prevBtn.disabled = false;
      else refs.prevBtn.disabled = true;

      if (currentPage > totalPage - 2) {
        refs.nextBtn.disabled = false;
      } else refs.nextBtn.disabled = false;
    }

    // refs.filterCategories.addEventListener('click', removeListner);

    // function removeListner() {
    //   refs.pgContainer.removeEventListener('click', clickOnPage);
    //   refs.nextBtn.removeEventListener('click', nextBtnClick);
    //   refs.pgContainer.removeEventListener('click', prevBtnClick);

    //   refs.prevBtn.disabled = true;
    //   refs.nextBtn.disabled = false;
    // }
  })

  .catch(error => Notify.failure('Error: ' + error.message))
  .finally(hideLoader);

function renderPage(currentPage) {
  let marcup = '';
  console.log(currentPage >= totalPage - 2);
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
    console.log('1');
    for (let i = 0; i < totalPage; i += 1) {
      if (i !== currentPage) {
        marcup += `<li class="pg-item" data-page="${i}"><a>${i + 1}</a></li>`;
      } else {
        marcup += `<li class="pg-item active" data-page="${i}"><a>${
          i + 1
        }</a></li>`;
      }
    }
  } else if (currentPage < 2) {
    console.log('2');
    for (let i = 0; i < 4; i += 1) {
      if (i !== currentPage) {
        marcup += `<li class="pg-item" data-page="${i}"><a>${i + 1}</a></li>`;
      } else if (i < rightAmount.length) {
        marcup += `<li class="pg-item active" data-page="${i}"><a>${
          i + 1
        }</a></li>`;
      }
    }
  } else {
    console.log('3');
    for (let i = currentPage - 2; i <= currentPage + 1; i += 1) {
      if (i !== currentPage) {
        marcup += `<li class="pg-item" data-page="${i}"><a>${i + 1}</a></li>`;
      } else {
        marcup += `<li class="pg-item active" data-page="${i}"><a>${
          i + 1
        }</a></li>`;
      }
    }
  }
  refs.pgContainer.innerHTML = marcup;
}

export { clickOnPage };
