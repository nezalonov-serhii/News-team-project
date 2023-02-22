import { getDataByCategory } from '../api/news';
import { hideLoader } from '../loader/loader';
import { saveValuesFromCategoryNews, renderNewsList } from '../markup/markup';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { refs } from '../refs/refs';

let totalPage = 0;
let currentPage = 0;
let newsPerPage = 0;
let rightAmount = [];

// refs.filterCategories.addEventListener('click', renderNewsCategory);
