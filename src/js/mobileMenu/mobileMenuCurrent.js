const homePage = document.querySelector('#home');
const favouritePage = document.querySelector('#favourite');
const readPage = document.querySelector('#read');
const logoHomePage = document.querySelector('.logo');
const logoHomePageMenu = document.querySelector('#mob-logo');


const arr = [homePage, favouritePage, readPage];


const currentPage = localStorage.getItem('currentPage') || 'home';

document.querySelector(`#${currentPage}`).classList.add('mobile-menu__current');

homePage.addEventListener('click', changeCurrentPageLink);
favouritePage.addEventListener('click', changeCurrentPageLink);
readPage.addEventListener('click', changeCurrentPageLink);
logoHomePage.addEventListener('click', changeCurrentPageLogo);
logoHomePageMenu.addEventListener('click', changeCurrentPageLogo);

window.addEventListener("load", pageLoad);

function changeCurrentPageLink(event) {

console.log(event.currentTarget);
    arr.forEach((item) => {
        item.classList.remove('mobile-menu__current');
    })
    event.currentTarget.classList.add('mobile-menu__current');
    console.log(event.currentTarget.id);
 localStorage.setItem('currentPage', event.currentTarget.id); 
    
};

function changeCurrentPageLogo() {
    arr.forEach((item) => {
        item.classList.remove('mobile-menu__current');
    })

    homePage.classList.add('mobile-menu__current');
    localStorage.setItem('currentPage', homePage.id);
}
 
function pageLoad() { 
    const currentPageName = window.location.pathname;
    console.log(currentPageName);
  if (currentPageName === '/index.html') {
    localStorage.setItem('currentPage', homePage.id);
    }
    else if(currentPageName === '/favorite.html'){
    localStorage.setItem('currentPage', favouritePage.id);      
    }
  else if(currentPageName === '/read.html'){
      localStorage.setItem('currentPage', readPage.id);
    }
}