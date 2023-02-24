const refs = {
  body: document.querySelector('body'),
  main: document.querySelector('main'),
  loader: document.querySelector('.loader-backdrop'),
  // Search news
  form: document.querySelector('.search'),
  filterCategories: document.querySelector('.filter__wrap'),
  filterOthers: document.getElementById('filter-others'),
  //main
  newsList: document.querySelector('.news__lists'),
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

  // celendar
  celendarDate: document.querySelector('#choseDataButton'),

  //pagination
  prevBtn: document.querySelector('.prev-page'),
  nextBtn: document.querySelector('.next-page'),
  pgContainer: document.querySelector('#pagination'),
  pgHidden: document.querySelector('.pagination-hidden'),
  form: document.querySelector('.search'),

  //mobile
  homePage: document.querySelector('#home'),
  favouritePage: document.querySelector('#favourite'),
  readPage: document.querySelector('#read'),
  logoHomePage: document.querySelector('.logo'),
  logoHomePageMenu: document.querySelector('#mob-logo'),
  menuOpentBtn: document.querySelector('#btn-open'),
  mobileMenu: document.querySelector('.js-menu-container'),
  openMenuBtn: document.querySelector('.js-open-menu'),
  closeMenuBtn: document.querySelector('.js-close-menu'),
};

export { refs };
