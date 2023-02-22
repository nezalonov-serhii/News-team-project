import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getCategoryList, getDataByCategory } from '../api/news';
import { hideLoader } from '../loader/loader';
import { refs } from '../refs/refs';
import { renderNewsCategory } from '../pagination/fillterPagination';
import { getPopular } from '../api/news';

import {
  renderPopularNews,
  saveValuesFromCategoryNews,
  renderNewsList,
} from '../markup/markup';

import { createNewsCard } from '../markup/card';

const mql = window.matchMedia('(min-width: 768px) and (max-width: 1279.8px)');

let totalPage = 0;
let currentPage = 0;
let newsPerPage = 0;
let rightAmount = [];
let data = [];

refs.mainCategories.addEventListener('click', onMainCategoriesClick);
refs.showOthersBtn.addEventListener('click', onShowOthersBtnClick);
refs.dropdownList.addEventListener('click', onDropdownListClick);
// refs.pgContainer.addEventListener('click', onBtnClick);
document.querySelector('.pagin').addEventListener('click', onBtnClick);

mql.addEventListener('change', updateCategoriesInUI);

init();

function onMainCategoriesClick({ target }) {
  if (target.nodeName !== 'BUTTON') {
    return;
  }

  deactivateShowOthersBtn();
  closeDropdownList();
  selectNewCategory(target);
}

function onShowOthersBtnClick({ target }) {
  if (isMainCategorySelected()) {
    target.classList.toggle('isActive');
  } else {
    target.classList.add('isActive');
  }

  refs.dropdownList.classList.toggle('isOpen');

  setTimeout(() => {
    document.documentElement.addEventListener('click', hideDropdownList, {
      once: true,
    });
  }, 0);
}

function hideDropdownList({ target }) {
  if (target.nodeName !== 'BUTTON') {
    isMainCategorySelected() && deactivateShowOthersBtn();
    closeDropdownList();
  }
}

function closeDropdownList() {
  refs.dropdownList.classList.remove('isOpen');
}

function deactivateShowOthersBtn() {
  refs.showOthersBtn.classList.remove('isActive');
}

function onDropdownListClick({ target }) {
  if (target.nodeName !== 'BUTTON') {
    return;
  }
  selectNewCategory(target);
  closeDropdownList();
}

async function selectNewCategory(newCategory) {
  try {
    const prevCategory = findPrevCategory();

    if (prevCategory === newCategory) {
      return;
    }

    prevCategory && prevCategory.classList.remove('isSelected');
    newCategory.classList.add('isSelected');

    currentPage = 0;
    data = await getDataByCategory(newCategory.dataset.category_name);

    if (window.matchMedia('(max-width: 767.98px)').matches) {
      newsPerPage = 4;
    } else if (window.matchMedia('(min-width: 1280px)').matches) {
      newsPerPage = 8;
    } else if (window.matchMedia('(min-width: 768px)').matches) {
      newsPerPage = 7;
    }

    totalPage = Math.ceil(data.length / newsPerPage);
    rightAmount = data.slice(
      currentPage * newsPerPage,
      currentPage * newsPerPage + newsPerPage
    );

    const newsArr = saveValuesFromCategoryNews(rightAmount);
    renderNewsList(newsArr);
    renderPage(currentPage);
  } catch (error) {
    Notify.failure('Error: ' + error.message);
  } finally {
    hideLoader();
  }
}

function onBtnClick({ target }) {
  if (target.nodeName !== 'LI' && target.nodeName !== 'BUTTON') {
    return;
  }

  if (target.classList.contains('prev-page')) {
    currentPage -= 1;
  } else if (target.classList.contains('next-page')) {
    currentPage += 1;
  } else {
    const prevACtiveBtn = document.querySelector('.pg-item.active');
    prevACtiveBtn && prevACtiveBtn.classList.remove('active');

    target.classList.add('active');
    currentPage = target.dataset.page;
  }

  rightAmount = data.slice(
    currentPage * newsPerPage,
    currentPage * newsPerPage + newsPerPage
  );

  const newsArr = saveValuesFromCategoryNews(rightAmount);
  renderNewsList(newsArr);
}

function findPrevCategory() {
  return refs.categoryWrapper.querySelector('.isSelected');
}

function isMainCategorySelected() {
  const prevCategory = findPrevCategory();

  return prevCategory
    ? prevCategory.classList.contains('main-categories__btn')
    : false;
}

function init() {
  updateCategoriesInUI();
}
async function updateCategoriesInUI() {
  try {
    hideCategoryWrapper();

    const result = await getCategoryList();
    const categoryList = result.map(item => item.section);

    fillCategoryLists(categoryList);
    updateBtnText();
    new SimpleBar(refs.dropdownList, {});
    showCategoryWrapper();
  } catch (error) {
    Notify.failure('Error: ' + error.message);
  } finally {
    hideLoader();
  }
}

function showCategoryWrapper() {
  refs.categoryWrapper.classList.add('isFilled');
}

function hideCategoryWrapper() {
  refs.categoryWrapper.classList.remove('isFilled');
}

function updateBtnText() {
  refs.showOthersBtn.querySelector('span').textContent = getBtnText();
}

function getBtnText() {
  if (window.innerWidth < 768) {
    return 'Categories';
  }
  return 'Others';
}

function fillCategoryLists(categoryList) {
  const lists = divideCategories(categoryList);

  const mainCategoriesMarkup = makeCategoriesMarkup(
    lists.mainCategories,
    'main-categories'
  );
  const dropdownListMarkup = makeCategoriesMarkup(
    lists.dropdownList,
    'dropdown-list'
  );

  clearCategoryLists();
  insertMarkup(mainCategoriesMarkup, refs.mainCategories);
  insertMarkup(dropdownListMarkup, refs.dropdownList);
}

function divideCategories(categoryList) {
  const mainCategories = [];
  const dropdownList = categoryList.slice();
  const mainCategoriesNumber = defineMainCategoriesNumber();

  for (let i = 0; i < mainCategoriesNumber; i += 1) {
    const randomIndex = Math.floor(Math.random() * dropdownList.length);
    const categoryLength = dropdownList[randomIndex].length;

    if (categoryLength > 7) {
      i -= 1;
      continue;
    }

    const category = dropdownList.splice(randomIndex, 1);
    mainCategories.push(...category);
  }

  return {
    mainCategories: mainCategories.sort((a, b) => a.localeCompare(b)),
    dropdownList: dropdownList.sort((a, b) => a.localeCompare(b)),
  };
}

function defineMainCategoriesNumber() {
  const innerWidth = window.innerWidth;

  if (innerWidth < 768) {
    return 0;
  }
  if (innerWidth < 1280) {
    return 4;
  }

  return 6;
}

function clearCategoryLists() {
  refs.mainCategories.innerHTML = '';
  refs.dropdownList.innerHTML = '';
}

function insertMarkup(markup, listRef) {
  listRef.insertAdjacentHTML('beforeend', markup);
}

function makeCategoriesMarkup(categoryList, className) {
  return categoryList
    .map(
      category => `
    <li class="${className}__item">
      <button class="${className}__btn" type="button" data-category_name="${category}">${category}</button>
    </li>
  `
    )
    .join('');
}

//////
function renderPage(currentPage) {
  let marcup = '';

  if (window.matchMedia('(max-width: 768px)').matches) {
    if (currentPage === 0) {
      refs.prevBtn.disabled = true;
    }
    if (currentPage === rightAmount.length) {
      refs.nextBtn.disabled = true;
    }
    if (currentPage >= rightAmount.length) {
      const allBtns = document.querySelectorAll('.pg-item');
      console.log(allBtns);
      allBtns[allBtns.length - 1].classList.add('active');
      allBtns[allBtns.length - 2].classList.remove('active');
      return;
    }
    if (currentPage < 3) {
      for (let i = 0; i < 4; i += 1) {
        if (i !== currentPage) {
          marcup += `<li class="pg-item" data-page="${i}"><a>${i + 1}</a></li>`;
        } else if (i < rightAmount.length) {
          marcup += `<li class="pg-item active" data-page="${i}"><a>${
            i + 1
          }</a></li>`;
        }
      }
    } else if (currentPage === 3) {
      for (let i = currentPage - 2; i <= currentPage + 1; i += 1) {
        if (i !== currentPage) {
          marcup += `<li class="pg-item" data-page="${i}"><a>${i + 1}</a></li>`;
        } else if (i <= rightAmount.length - 1) {
          marcup += `<li class="pg-item active" data-page="${i}"><a>${
            i + 1
          }</a></li>`;
        }
      }
    }
    refs.pgContainer.innerHTML = marcup;
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    if (currentPage > rightAmount.length) {
      refs.nextBtn.disabled = true;
      return;
    }
    if (currentPage === 0) {
      refs.prevBtn.disabled = true;
    }
    if (currentPage === totalPage - 1) {
      refs.nextBtn.disabled = true;
    }
    if (currentPage >= rightAmount.length) {
      const allBtns = document.querySelectorAll('.pg-item');
      console.log(allBtns);
      allBtns[allBtns.length - 1].classList.add('active');
      allBtns[allBtns.length - 2].classList.remove('active');
      return;
    }
    if (currentPage < 3) {
      for (let i = 0; i < totalPage; i += 1) {
        if (i !== currentPage) {
          marcup += `<li class="pg-item" data-page="${i}"><a>${i + 1}</a></li>`;
        } else if (i < rightAmount.length) {
          marcup += `<li class="pg-item active" data-page="${i}"><a>${
            i + 1
          }</a></li>`;
        }
      }
    } else if (currentPage === 3) {
      for (let i = currentPage - 2; i <= currentPage + 1; i += 1) {
        if (i !== currentPage) {
          marcup += `<li class="pg-item" data-page="${i}"><a>${i + 1}</a></li>`;
        } else if (i <= rightAmount.length - 1) {
          marcup += `<li class="pg-item active" data-page="${i}"><a>${
            i + 1
          }</a></li>`;
        }
      }
    }
    refs.pgContainer.innerHTML = marcup;
  }
}

if (window.matchMedia('(max-width: 767.98px)').matches) {
  newsPerPage = 4;
} else if (window.matchMedia('(min-width: 1280px)').matches) {
  newsPerPage = 8;
} else if (window.matchMedia('(min-width: 768px)').matches) {
  newsPerPage = 7;
}

getPopular()
  .then(news => {
    data = news;
    totalPage = Math.ceil(news.length / newsPerPage);

    function getRightAmount() {
      rightAmount = news.slice(
        currentPage * newsPerPage,
        currentPage * newsPerPage + newsPerPage
      );
    }

    getRightAmount();

    renderPage(currentPage);

    renderPopularNews(rightAmount);
  })
  .catch();
