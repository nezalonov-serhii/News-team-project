import { getPopular, getDataByCategory } from '../api/news';
import { hideLoader } from '../loader/loader';
import {
  renderPopularNews,
  saveValuesFromCategoryNews,
  renderNewsList,
} from '../markup/markup';
import { nextBtnClick } from './popular';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { refs } from '../refs/refs';

let totalPage = 0;
let currentPage = 0;
let newsPerPage = 0;
let rightAmount = [];

// refs.filterCategories.addEventListener('click', renderNewsCategory);
