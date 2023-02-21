import { getPopular } from '../api/news';
import { renderPopularNews } from '../markup/markup';
import { refs } from '../refs/refs';

let newsPerPage = 8;
let totalPage = 0;
let currentPage = 0;
let rightAmount = [];

getPopular()
  .then(news => {
    totalPage = Math.ceil(news.length / newsPerPage);

    renderPage(totalPage);

    function getRightAmount() {
      rightAmount = news.slice(
        currentPage * newsPerPage,
        currentPage * newsPerPage + newsPerPage
      );
    }

    getRightAmount();
    renderPopularNews(rightAmount);

    refs.prevBtn.addEventListener('click', e => {
      currentPage--;

      getRightAmount();
      renderPopularNews(rightAmount);

      prevActive();
      if (currentPage < totalPage) refs.nextBtn.disabled = false;
    });

    refs.nextBtn.addEventListener('click', e => {
      currentPage++;

      getRightAmount();
      renderPopularNews(rightAmount);

      nextActive();
      if (currentPage > 0) refs.prevBtn.disabled = false;
    });

    function prevActive() {
      const allBtns = document.querySelectorAll('.pg-item');

      [...allBtns].map(el => {
        if (el.classList.contains('active')) {
          el.classList.remove('active');
          let prevPage = el.previousSibling;
          prevPage.classList.add('active');

          if (currentPage === 0) refs.prevBtn.disabled = true;
        }
      });
    }

    function nextActive() {
      const allBtns = document.querySelectorAll('.pg-item');

      let curentEl = [...allBtns].find(el => {
        return el.classList.contains('active');
      });

      curentEl.classList.remove('active');
      curentEl.nextSibling.classList.add('active');

      if (currentPage === totalPage - 1) {
        refs.nextBtn.disabled = true;
      }
    }

    refs.pgContainer.addEventListener('click', clickOnPage);

    function clickOnPage(e) {
      if (e.target.nodeName === 'UL') return;
      currentPage = e.target.getAttribute('data-page');

      getRightAmount();
      renderPopularNews(rightAmount);
      activePage(e);
    }

    function activePage(e) {
      const allBtns = document.querySelectorAll('.pg-item');
      allBtns.forEach(btn => {
        btn.classList.remove('active');
        if (
          e.target.getAttribute('data-page') === btn.getAttribute('data-page')
        )
          btn.classList.add('active');
      });
    }
  })
  .catch();

function renderPage(totalPage) {
  let marcup = '';
  for (let i = 1; i <= totalPage; i += 1) {
    if (i === 1) {
      marcup += `<li class="pg-item active" data-page="${
        i - 1
      }"><a>${i}</a></li>`;
      continue;
    }
    marcup += `<li class="pg-item" data-page="${i - 1}"><a>${i}</a></li>`;
  }
  refs.pgContainer.innerHTML = marcup;
}
