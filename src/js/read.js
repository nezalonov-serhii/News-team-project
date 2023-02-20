import './refs/refs';

import './mobileMenu/mobileMenu';
import './mobileMenu/mobileMenuCurrent';
import { refs } from './refs/refs';
import Sprite from '../images/sprite.svg';

console.log(Sprite + '#arrow-down');

addEventHandlers();

function getReadNewsBtn() {
  return document.querySelectorAll('.js-read-news-btn');
}

function addEventHandlers() {
  const btns = getReadNewsBtn();
  btns.forEach(btn => btn.addEventListener('click', onReadNewsBtnClick));
}

function onReadNewsBtnClick({ target }) {
  target.classList.toggle('isOpen');

  const markup = makeReadNewsMarkup();

  refs.readNewsContainer.insertAdjacentHTML('beforeend', markup);
  addEventHandlers();
}

function makeReadNewsMarkup(news) {
  return `<div class="read-news__list">
    <button class="read-news__btn js-read-news-btn">
      <span>20/02/2021</span>
      <svg><use href="${Sprite + '#arrow-down'}"></use></svg>
    </button>
  </div>`;
}
