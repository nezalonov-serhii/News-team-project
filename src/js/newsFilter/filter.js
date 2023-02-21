import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getCategoryList, getDataByCategory } from '../api/news';
import { hideLoader } from '../loader/loader';
import { refs } from '../refs/refs';

const mql = window.matchMedia('(min-width: 768px) and (max-width: 1279.8px)');

// refs.mainCategories.addEventListener('click', onMainCategoriesClick);
refs.showOthersBtn.addEventListener('click', onShowOthersBtnClick);
refs.dropdownList.addEventListener('click', onDropdownListClick);
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

    const result = await getDataByCategory(newCategory.dataset.category_name);
  } catch (error) {
    Notify.failure('Error: ' + error.message);
  } finally {
    hideLoader();
  }
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
