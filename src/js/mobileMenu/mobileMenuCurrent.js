import { refs } from '../refs/refs';

const arr = [refs.homePage, refs.favouritePage, refs.readPage];


const currentPage = localStorage.getItem('currentPage') || 'home';

document.querySelector(`#${currentPage}`).classList.add('mobile-menu__current');

refs.homePage.addEventListener('click', changeCurrentPageLink);
refs.favouritePage.addEventListener('click', changeCurrentPageLink);
refs.readPage.addEventListener('click', changeCurrentPageLink);
refs.logoHomePage.addEventListener('click', changeCurrentPageLogo);
refs.logoHomePageMenu.addEventListener('click', changeCurrentPageLogo);


refs.menuOpentBtn.addEventListener("click", pageLoad);

function changeCurrentPageLink(event) {
    arr.forEach((item) => {
        item.classList.remove('mobile-menu__current');
    })
    event.currentTarget.classList.add('mobile-menu__current');
 localStorage.setItem('currentPage', event.currentTarget.id); 
    
};

function changeCurrentPageLogo() {
    arr.forEach((item) => {
        item.classList.remove('mobile-menu__current');
    })

    refs.homePage.classList.add('mobile-menu__current');
    localStorage.setItem('currentPage', refs.homePage.id);
}
 
function pageLoad() { 
    const currentPageName = window.location.pathname;
  if (currentPageName === '/index.html') {
    localStorage.setItem('currentPage', refs.homePage.id);
    }
    else if(currentPageName === '/favorite.html'){
    localStorage.setItem('currentPage', refs.favouritePage.id);      
    }
  else if(currentPageName === '/read.html'){
      localStorage.setItem('currentPage', refs.readPage.id);
    }
}