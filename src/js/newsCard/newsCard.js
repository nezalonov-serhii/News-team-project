import { getPopular } from '../api/news.js';
import { hideLoader } from '../loader/loader';

const newsList = document.querySelector('.news__item');
console.log(newsList);

//Створюється одна карточка

getPopular().then(data => {
    addMarkup(newsList, createNewsCard(data[7]));
});

    addMarkup(newsList, createNewsCard(data[0]));
  })
  .catch()
  .finally(data => hideLoader());


//Функція створення однієї карточки


function createNewsCard({
  title,
  media,
  url,
  published_date,
  section,
  abstract,
  id,
}) {
  return `
            <li class="news__item">
                <article class="news__article" id="${id}">
                    <div class="news__wrapper" >
                        <img class="news__img" src="${media[0]['media-metadata'][2].url}" alt="">

                        <p class="news__category">${section}</p>

                        <button type="button" class="item-news__add-to-favorite ">
                          <span class="item-news__add-to-favorite-btn">Add to favorite
                            <svg class="item-news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">
                                    <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
                                    </svg></span>
                                    <span class="item-news__remove-to-favorite-btn">Remove from favorite
                                    <svg class="item-news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">
                                    <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
                                    </svg></span>
                          </button>

                        
                    </div>
                    <div class="new__text-wrapper">
                    <h2 class=" news__title">${title}</h2>
                    <p class="news__description">${newsCardTextFormat(
                      abstract
                    )}</p>
                    </div>
                    <div class="news__info">
                        <span class="news__date">${published_date}</span>
                        <a class="news__link-more" href="${url}">Read more</a>
                    </div>
                </article>
            </li>
    `;
}

// addMarkup Додаю розмітку 

function addMarkup(element, constMarkup) {
  element.insertAdjacentHTML('beforeend', constMarkup);
}

//Add ... 80 elements Перевірка довжини тексту

function newsCardTextFormat(element) {
  let textFormat = element;
  if (textFormat.length > 80) {
    textFormat = element.slice(0, 80) + '...';
  }
  return textFormat;
}



//Клік мишкою на улюблене



newsList.addEventListener('click', btnAddToFavorite);
let newLocalStorage = [];

//Перевірка чи є дані в  LocalStorage


function isLocalEmpty() {
  if (JSON.parse(localStorage.getItem('newsSection')) === null) {
    newLocalStorage = [];
    return;
  }
  newLocalStorage = JSON.parse(localStorage.getItem('newsSection'));
}
isLocalEmpty();

//Кнопка улюблене 

function btnAddToFavorite(event) {
  const btn = event.target.closest(`.item-news__add-to-favorite`);
  console.log(btn.parentNode.parentNode.lastElementChild.children[1].attributes[1].value);
  if (!btn) return;
  isLocalEmpty();
  let uri =
    btn.parentNode.nextElementSibling.nextElementSibling.lastElementChild
      .textContent;
  console.log(uri);
  if (!btn.classList.contains('hidden-span')) {
    btn.classList.add('hidden-span');

    addToFavoriteLocal(btn);
    return;
  }
  btn.classList.remove('hidden-span');
  for (let i = 0; i < newLocalStorage.length; i += 1) {
    if (newLocalStorage[i].uri === uri) {
      newLocalStorage.splice(i, 1);
    }
  }
  localStorage.setItem(`newsSection`, JSON.stringify(newLocalStorage));
}


// Додаємо в локальне сховище дані через кнопку


function addToFavoriteLocal(btn) {
  const newsSection = {
    id: btn.parentNode.parentNode.id,
    img: btn.parentNode.childNodes[1].attributes.src.nodeValue,
    category: btn.parentNode.childNodes[3].innerText,
    title: btn.parentNode.parentNode.childNodes[3].children[0].innerText,
    description: btn.parentNode.parentNode.childNodes[3].children[1].innerText,
    date: btn.parentNode.parentNode.lastElementChild.children[0].innerText,
    link: btn.parentNode.parentNode.lastElementChild.children[1].attributes[1]
      .value,
    favorite: 'true',
    uri: btn.parentNode.nextElementSibling.nextElementSibling.lastElementChild
      .textContent,
  };
  for (let i = 0; i < newLocalStorage.length; i += 1) {
    if (newLocalStorage[i].uri === newsSection.uri) return;

  }

  newLocalStorage.push(newsSection);
  localStorage.setItem(`newsSection`, JSON.stringify(newLocalStorage));
}



