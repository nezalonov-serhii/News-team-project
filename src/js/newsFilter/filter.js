const refs = {
  categoryWrapper: document.querySelector('.js-category-wrapper'),
  mainCategories: document.querySelector('.js-main-categories'),
  showOthersBtn: document.querySelector('.js-btn-show-others'),
  dropdownList: document.querySelector('.js-dropdown-list'),
};

const categoryList = [
  'monitor',
  'program',
  'application',
  'keyboard',
  'javascript',
  'gaming',
  'network',
  'authorized',
  'automatic',
  'avaricious',
  'average',
  'aware',
  'awesome',
  'awful',
  'awkward',
  'babyish',
  'bad',
  'back',
  'baggy',
  'bare',
  'barren',
  'basic',
  'beautiful',
  'belated',
  'beloved',
  'beneficial',
  'better',
  'best',
  'bewitched',
  'big',
  'bighearted',
  'biodegradable',
  'bitesized',
  'bitter',
  'black',
];
const mql = window.matchMedia('(min-width: 768px) and (max-width: 1279.8px)');

refs.mainCategories.addEventListener('click', onMainCategoriesClick);
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
  const mainCategoryIsSelected =
    refs.mainCategories.querySelector('.isSelected');

  if (mainCategoryIsSelected) {
    target.classList.toggle('isActive');
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
    deactivateShowOthersBtn();
    closeDropdownList();
  }
}

function openDropdownList() {
  refs.dropdownList.classList.add('isOpen');
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

function selectNewCategory(newCategory) {
  const prevCategory = findPrevCategory();

  if (prevCategory === newCategory) {
    return;
  }

  prevCategory && prevCategory.classList.remove('isSelected');
  newCategory.classList.add('isSelected');
}

function findPrevCategory() {
  return refs.categoryWrapper.querySelector('.isSelected');
}

function init() {
  updateCategoriesInUI();
}

function updateCategoriesInUI() {
  refs.showOthersBtn.querySelector('span').textContent = getBtnText();
  fillCategoryLists(categoryList);
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
      <button class="${className}__btn" type="button">${category}</button>
    </li>
  `
    )
    .join('');
}
