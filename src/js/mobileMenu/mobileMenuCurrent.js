const homePage = document.querySelector('#home');
const favouritePage = document.querySelector('#favourite');
const readPage = document.querySelector('#read');

const arr = [homePage, favouritePage, readPage];

const currentPage = localStorage.getItem('currentPage') || 'home';

// Set the initial current page based on the value retrieved from localStorage
document.querySelector(`#${currentPage}`).classList.add('mobile-menu__current');

homePage.addEventListener('click', changeCurrentPageLink);
favouritePage.addEventListener('click', changeCurrentPageLink);
readPage.addEventListener('click', changeCurrentPageLink);

function changeCurrentPageLink(event) {

console.log(event.currentTarget);
    arr.forEach((item) => {
        item.classList.remove('mobile-menu__current');
    })

    event.currentTarget.classList.add('mobile-menu__current');
    // favouritePage.classList.remove('mobile-menu__current');
 localStorage.setItem('currentPage', event.currentTarget.id);
};