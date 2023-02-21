import { getPopular } from '../api/news';
import { renderPopularNews } from '../markup/markup';
import { refs } from '../refs/refs';

let totalPage = 0;
let currentPage = 0;
let newsPerPage = 0;
let rightAmount = [];

if (window.matchMedia('(max-width: 480px)').matches) {
  newsPerPage = 4;
} else if (window.matchMedia('(min-width: 480px)').matches) {
  newsPerPage = 9;
} else if (window.matchMedia('(min-width: 1280px)').matches) {
  newsPerPage = 8;
}

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
      if (
        e.target.nodeName === 'UL' ||
        e.target.classList.contains('active') ||
        e.target.classList.contains('dots')
      )
        return;
      console.log(e.target);

      currentPage = e.target.getAttribute('data-page');

      getRightAmount();
      renderPopularNews(rightAmount);
      activePage(e);

      if (currentPage > 0) refs.prevBtn.disabled = false;
      else refs.prevBtn.disabled = true;

      if (currentPage > totalPage - 2) {
        refs.nextBtn.disabled = true;
      } else refs.nextBtn.disabled = false;
    }

    function activePage(e) {
      if (e.target.classList.contains('dots')) return;
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

  // if (window.matchMedia('(max-width: 480px)').matches) {
  //   for (let i = 1; i <= totalPage; i += 1) {
  //     if (i === 1) {
  //       marcup += `<li class="pg-item active" data-page="${
  //         i - 1
  //       }"><a>${i}</a></li>`;
  //       continue;
  //     }

  //     if (i === 2) {
  //       marcup += `<li class="pg-item " data-page="${i - 1}"><a>${i}</a></li>`;
  //       continue;
  //     }

  //     if ((i === 2 && totalPage > 3) || (totalPage > 3 && i === 4)) {
  //       marcup += `<li class="dots">...</li>`;
  //     }
  //     if (totalPage === i) {
  //       marcup += `<li class="pg-item" data-page="${i - 1}"><a>${i}</a></li>`;
  //     }
  //   }
  // } else if (window.matchMedia('(min-width: 480px)').matches) {
  //   for (let i = 1; i <= totalPage; i += 1) {
  //     if (i === 1) {
  //       marcup += `<li class="pg-item active" data-page="${
  //         i - 1
  //       }"><a>${i}</a></li>`;
  //       continue;
  //     }
  //     marcup += `<li class="pg-item" data-page="${i - 1}"><a>${i}</a></li>`;
  //   }
  // } else if (window.matchMedia('(min-width: 1280px)').matches) {
  //   for (let i = 1; i <= totalPage; i += 1) {
  //     if (i === 1) {
  //       marcup += `<li class="pg-item active" data-page="${
  //         i - 1
  //       }"><a>${i}</a></li>`;
  //       continue;
  //     }
  //     marcup += `<li class="pg-item" data-page="${i - 1}"><a>${i}</a></li>`;
  //   }
  // }

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
