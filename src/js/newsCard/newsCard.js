import { btnAddToFavorite } from '../favorite/addToFavorite';
import { linkReadMore } from '../btns/readMore';

const newsContainer = document.querySelector('.news > .container');

newsContainer.addEventListener('click', btnAddToFavorite);
newsContainer.addEventListener('click', linkReadMore);
