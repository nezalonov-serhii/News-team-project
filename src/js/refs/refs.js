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
  // weather
  deg :document.querySelector('.weather__degree'),
  value:document.querySelector('.weather__value'),
  city :document.querySelector('.weather__city'),
  day :document.querySelector('.weather__day'),
  year :document.querySelector('.weather__year'),
  imgWeather:document.querySelector('.weather__image'),
};

export { refs };
