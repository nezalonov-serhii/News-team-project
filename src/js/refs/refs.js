const refs = {
  body: document.querySelector('body'),
  main: document.querySelector('main'),
  loader: document.querySelector('.loader-backdrop'),

  // favorite
  favorite: document.querySelector('.news'),
  favoriteLists: document.querySelector('.news__lists'),
  errorSearch: document.querySelector('.error-search'),

  // filter
  categoryWrapper: document.querySelector('.js-category-wrapper'),
  mainCategories: document.querySelector('.js-main-categories'),
  showOthersBtn: document.querySelector('.js-btn-show-others'),
  dropdownList: document.querySelector('.js-dropdown-list'),

  //read news
  readNewsContainer: document.querySelector('.read-news__container'),
};

export { refs };
