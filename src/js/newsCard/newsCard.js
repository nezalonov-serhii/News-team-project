import { getPopular } from '../api/news.js';

const newsList = document.querySelector('.news__item');
console.log(newsList);

const button = document.querySelector("button");
console.log(button);




getPopular().then(data => {
    // console.log(data[0]);
    // console.log(createNewsCard(data[0]));
    
    addMarkup(newsList, createNewsCard(data[7]));
});



// const handleClick = (event) => {
//     console.log("event: ", event);
//     console.log("event type: ", event.type);
//     console.log("currentTarget: ", event.currentTarget);
//   };
  
//   button.addEventListener("click", handleClick);




function createNewsCard({
  title,
  media,
  url,
  published_date,
  section,
  abstract,
}) {
  return `
            <li class="news__item">
                <article class="news__article">
                    <div class="news__wrapper">
                        <img class="news__img" src="${media[0]['media-metadata'][2].url}" alt="">
                        <p class="news__category">${section}</p>

                        <button type="button" class=" btn news__add-to-favorite ">
                        <span class="news__add-to-favorite-btn">Add to favorite
                           <svg class="news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">
                                  <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
                        </svg></span>
                                
                        <span class="news__remove-to-favorite-btn hidden">Remove from favorite
                        <svg class="item-news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">
                        <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
                        </svg></span>      


                        </button>
                        
                        

                        
                    </div>
                    <div class="new__text-wrapper">
                    <h2 class=" news__title">${title}</h2>
                    <p class="news__description">${newsCardTextFormat(abstract)}</p>
                    </div>
                    <div class="news__info">
                        <span class="news__date">${published_date}</span>
                        <a class="news__link-more" href="${url}">Read more</a>
                    </div>
                </article>
            </li>
    `;
}

// addMarkup

function addMarkup(element, constMarkup) {
  element.insertAdjacentHTML('beforeend', constMarkup);
}

//Add ... 80 elements

function newsCardTextFormat(element) {
    let textFormat = element;
    if (textFormat.length > 80) {
      textFormat = element.slice(0, 80) + '...';
    }
    return textFormat;
  }


//            


// <p class="news__favorite">Add to favorite

// <svg class="news__icon" width="16" height="16" viewBox="0 0 37 32">
    
//     <path fill="none" stroke="#4440f7" style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2" d="M9.333 4c-3.681 0-6.667 2.955-6.667 6.6 0 2.943 1.167 9.927 12.651 16.987 0.206 0.125 0.442 0.191 0.683 0.191s0.477-0.066 0.683-0.191c11.484-7.060 12.651-14.044 12.651-16.987 0-3.645-2.985-6.6-6.667-6.6s-6.667 4-6.667 4-2.985-4-6.667-4z"></path>

// </svg>

// </p>

// Btn remove

// <span class="item-news__remove-to-favorite-btn hidden">Remove from favorite
// <svg class="item-news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">
// <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
// </svg></span>




newsList.addEventListener('click', btnAddToFavorite);
let newLocalStorage = [];

function isLocalEmpty() {
  if (JSON.parse(localStorage.getItem('newsSection')) === null) {
    newLocalStorage = [];
    return;
  }
  newLocalStorage = JSON.parse(localStorage.getItem('newsSection'));
}
isLocalEmpty();

function btnAddToFavorite(event) {
  const btn = event.target.closest(`.news__add-to-favorite`);
  const span_add = event.target.closest(`.news__add-to-favorite-btn`);
  const span_remuve = event.target.closest(`.news__remove-to-favorite-btn `);

  console.log(btn);
  console.log(span_add);
  console.log(span_remuve);
  if (!btn) return;
  isLocalEmpty();
  let uri =
    btn.parentNode.nextElementSibling.nextElementSibling.lastElementChild
      .textContent;
  console.log(uri);

//   hide(){
//     this.button.classList.add("hidden");
// }

// show(){
//     this.button.classList.remove("hidden");
// }

  if (!span_add.classList.contains('hidden')) {
    // span_remuve.classList.remove('hidden');
    span_add.classList.add('hidden');
    addToFavoriteLocal(btn);
    return;
  }
  btn.classList.remove('hidden');

  for (let i = 0; i < newLocalStorage.length; i += 1) {
    if (newLocalStorage[i].uri === uri) {
      newLocalStorage.splice(i, 1);
    }

  }
  localStorage.setItem(`newsSection`, JSON.stringify(newLocalStorage));
}

// function addToFavoriteLocal(btn) {
//   const newsSection = {
//     id: btn.parentNode.parentNode.id,
//     img: btn.parentNode.childNodes[1].attributes.src.nodeValue,
//     category: btn.parentNode.childNodes[3].innerText,
//     title: btn.parentNode.parentNode.childNodes[3].children[0].innerText,
//     description: btn.parentNode.parentNode.childNodes[3].children[1].innerText,
//     date: btn.parentNode.parentNode.lastElementChild.children[0].innerText,
//     link: btn.parentNode.parentNode.lastElementChild.children[1].attributes[2]
//       .value,
//     favorite: 'true',
//     uri: btn.parentNode.nextElementSibling.nextElementSibling.lastElementChild
//       .textContent,
//   };
//   for (let i = 0; i < newLocalStorage.length; i += 1) {
//     if (newLocalStorage[i].uri === newsSection.uri) return;
//   }

//   newLocalStorage.push(newsSection);
//   localStorage.setItem(`newsSection`, JSON.stringify(newLocalStorage));
// }
