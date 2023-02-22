import { getPopular, getDataByCategory } from '../api/news';
import { hideLoader } from '../loader/loader';
import {
  renderPopularNews,
  saveValuesFromCategoryNews,
  renderNewsList,
} from '../markup/markup';
import { refs } from '../refs/refs';

let totalPage = 0;
let currentPage = 0;
let newsPerPage = 0;
let rightAmount = [];

// refs.filterCategories.addEventListener('click', renderNewsCategory);

if (window.matchMedia('(max-width: 767.98px)').matches) {
  newsPerPage = 4;
} else if (window.matchMedia('(min-width: 768px)').matches) {
  newsPerPage = 7;
} else if (window.matchMedia('(min-width: 1280px)').matches) {
  newsPerPage = 8;
}

let btnsAreExisted = false;

// export function renderNewsCategory(categoryName, res) {
//   const result = res;

//   // if (!btnsAreExisted) {
//   //   const prevPage = `<button class="prev-page" disabled>
//   //     <a class="fas fa-angle-left"> <span class="s_prew">&#8249;</span> Prew </a>
//   //   </button>`;

//   //   const nextPage = `<button class="next-page">
//   //     <a class="fas fa-angle-right"> Next <span class="s_next">&#8250;<span></a>
//   //   </button>`;
//   // }

//   refs.pgContainer.insertAdjacentHTML('afterend', nextPage);
//   refs.pgContainer.insertAdjacentHTML('afterbegin', prevPage);

//   totalPage = Math.ceil(result.length / newsPerPage);

//   function getRightAmount() {
//     rightAmount = result.slice(
//       currentPage * newsPerPage,
//       currentPage * newsPerPage + newsPerPage
//     );
//   }

//   getRightAmount();
//   saveValuesFromCategoryNews(rightAmount);

//   renderPage(currentPage);

//   const cardList = [];
//   console.log(cardList);
//   renderNewsList(cardList);

//   refs.prevBtn
//     .addEventListener('click', e => {
//       currentPage--;

//       getRightAmount();
//       renderNewsList(cardList);

//       prevActive();
//       if (currentPage < totalPage)
//         document.querySelector('.next-page').disabled = false;

//       document.querySelector('.next-page').addEventListener('click', e => {
//         currentPage++;

//         getRightAmount();
//         renderNewsList(cardList);
//         nextActive();

//         if (currentPage > 0)
//           document.querySelector('.prev-page').disabled = false;
//       });

//       function prevActive() {
//         renderPage(currentPage);
//       }
//       function nextActive() {
//         renderPage(currentPage);
//       }

//       function activePage(e) {
//         const allBtns = document.querySelectorAll('.pg-item');
//         allBtns.forEach(btn => {
//           btn.classList.remove('active');
//           if (
//             target.getAttribute('data-page') === btn.getAttribute('data-page')
//           )
//             btn.classList.add('active');
//         });
//       }
//     })
//     .catch()
//     .finally(hideLoader);
// }

// getPopular()
//   .then(news => {
//     totalPage = Math.ceil(news.length / newsPerPage);

//     function getRightAmount() {
//       rightAmount = news.slice(
//         currentPage * newsPerPage,
//         currentPage * newsPerPage + newsPerPage
//       );
//     }

//     getRightAmount();
//     renderPage(currentPage);

//     renderPopularNews(rightAmount);

//     refs.prevBtn.addEventListener('click', e => {
//       currentPage--;

//       getRightAmount();
//       renderPopularNews(rightAmount);

//       prevActive();
//       if (currentPage < totalPage) refs.nextBtn.disabled = false;
//     });

//     refs.nextBtn.addEventListener('click', e => {
//       currentPage++;

//       getRightAmount();
//       renderPopularNews(rightAmount);
//       nextActive();

//       if (currentPage > 0) refs.prevBtn.disabled = false;
//     });

//     function prevActive() {
//       renderPage(currentPage);
//     }
//     function nextActive() {
//       renderPage(currentPage);
//     }

//     // function nextActive() {
//     //   renderPage(totalPage, currentPage, news);
//     // }

//     refs.pgContainer.addEventListener('click', clickOnPage);

//     function clickOnPage(e) {
//       if (e.target.nodeName === 'UL' || e.target.classList.contains('active'))
//         return;

//       currentPage = +e.target.getAttribute('data-page');

//       renderPage(currentPage);
//       getRightAmount();
//       renderPopularNews(rightAmount);
//       activePage(e);

//       if (currentPage > 0) refs.prevBtn.disabled = false;
//       else refs.prevBtn.disabled = true;

//       if (currentPage > totalPage - 3) {
//         refs.nextBtn.disabled = true;
//       } else refs.nextBtn.disabled = false;
//     }

//     function activePage(e) {
//       const allBtns = document.querySelectorAll('.pg-item');
//       allBtns.forEach(btn => {
//         btn.classList.remove('active');
//         if (
//           e.target.getAttribute('data-page') === btn.getAttribute('data-page')
//         )
//           btn.classList.add('active');
//       });
//     }
//   })
//   .catch();

// function renderPage(currentPage) {
//   let marcup = '';

//   if (window.matchMedia('(max-width: 768px)').matches) {
//     if (currentPage === 0) {
//       refs.prevBtn.disabled = true;
//     }
//     if (currentPage === rightAmount.length) {
//       refs.nextBtn.disabled = true;
//     }
//     if (currentPage >= rightAmount.length) {
//       const allBtns = document.querySelectorAll('.pg-item');
//       console.log(allBtns);
//       allBtns[allBtns.length - 1].classList.add('active');
//       allBtns[allBtns.length - 2].classList.remove('active');
//       return;
//     }
//     if (currentPage < 3) {
//       for (let i = 0; i < 4; i += 1) {
//         if (i !== currentPage) {
//           marcup += `<li class="pg-item" data-page="${i}"><a>${i + 1}</a></li>`;
//         } else if (i < rightAmount.length) {
//           marcup += `<li class="pg-item active" data-page="${i}"><a>${
//             i + 1
//           }</a></li>`;
//         }
//       }
//     } else if (currentPage === 3) {
//       for (let i = currentPage - 2; i <= currentPage + 1; i += 1) {
//         if (i !== currentPage) {
//           marcup += `<li class="pg-item" data-page="${i}"><a>${i + 1}</a></li>`;
//         } else if (i <= rightAmount.length - 1) {
//           marcup += `<li class="pg-item active" data-page="${i}"><a>${
//             i + 1
//           }</a></li>`;
//         }
//       }
//     }
//     refs.pgContainer.innerHTML = marcup;
//   } else if (window.matchMedia('(min-width: 768px)').matches) {
//     // if (currentPage > rightAmount.length) {
//     //   refs.nextBtn.disabled = true;
//     //   return;
//     // }
//     if (currentPage === 0) {
//       refs.prevBtn.disabled = true;
//     }
//     if (currentPage === totalPage - 1) {
//       refs.nextBtn.disabled = true;
//     }
//     if (currentPage >= rightAmount.length) {
//       const allBtns = document.querySelectorAll('.pg-item');
//       console.log(allBtns);
//       allBtns[allBtns.length - 1].classList.add('active');
//       allBtns[allBtns.length - 2].classList.remove('active');
//       return;
//     }
//     if (currentPage < 3) {
//       for (let i = 0; i < totalPage; i += 1) {
//         if (i !== currentPage) {
//           marcup += `<li class="pg-item" data-page="${i}"><a>${i + 1}</a></li>`;
//         } else if (i < rightAmount.length) {
//           marcup += `<li class="pg-item active" data-page="${i}"><a>${
//             i + 1
//           }</a></li>`;
//         }
//       }
//     } else if (currentPage === 3) {
//       for (let i = currentPage - 2; i <= currentPage + 1; i += 1) {
//         if (i !== currentPage) {
//           marcup += `<li class="pg-item" data-page="${i}"><a>${i + 1}</a></li>`;
//         } else if (i <= rightAmount.length - 1) {
//           marcup += `<li class="pg-item active" data-page="${i}"><a>${
//             i + 1
//           }</a></li>`;
//         }
//       }
//     }
//     refs.pgContainer.innerHTML = marcup;
//   }
// }
