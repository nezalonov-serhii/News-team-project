import { refs } from "../refs/refs";
import { getPopular, getCategoryList, getSearchArticle, getDataByCategory } from "../api/news"
import {createNewsCard,newsCardTextFormat} from "../newsCard/newsCard"
// import {KEY,BASE_URL,POPULAR_NEWS} from "../api/news"
const sonic = "https://images.app.goo.gl/JcSM7XQrF2fSyDfa7"


let orderedNumber = 0;
refs.form .addEventListener("submit", searchNews)

function searchNews (e){
    e.preventDefault()
    // const query =  refs.form.elements.inputSearch.value
    // console.log(query)
    getCategoryList().then(articles =>{ console.log(articles); renderNewsList(articles)})

}
// function  fetchNews (query){
//     // по запросу
//     // return fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=ccA9QsXbvrHhGuvowEcHjyxEU2jAukPO`).then(resp => resp.json()).then(data => { ; return data.response.docs})
// // "https://static01.nyt.com/images/2023/02/18/multimedia/18xp-koons-miami/18xp-koons-miami-thumbStandard.jpg" полная нормальная ссылка

//     //    популярные нужно при открытии страници должны сразу быть  
//     // return fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=ccA9QsXbvrHhGuvowEcHjyxEU2jAukPO`).then(resp => resp.json()).then(data => { console.log(data);return data.results})
//     // {article.media[0]["media-metadata"][2].url !== null ? article.media[0]["media-metadata"][2].url : sonic}

//     // По категориям
//     return fetch(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=ccA9QsXbvrHhGuvowEcHjyxEU2jAukPO`).then(resp => resp.json()).then(data => { return data.results})
    
// }


   
 //  Сheck viewport
// const mqlMobile = window.matchMedia("(max-width:480px)")  
// const mqlTablet = window.matchMedia("(max-width:768px)")
// const mqlDekstop  = window.matchMedia("(min-width:1280px)")


function  renderNewsList(articles) {
    
  const markup = articles.reduce ((previousValue,article, index) => { 
    orderedNumber += 1
    if(index === 2)
    { return createMarkupWidgetWeather(orderedNumber) + previousValue}
 
     
    return  createNewsCard(article,orderedNumber) + previousValue
    
    },"")

updateNewList( markup)
orderedNumber = 0
}


// function createMarkupNewsCard({
//     title,
//     multimedia,
    
//     published_date,
//     section,
//     abstract,
//   }){
//     return `<li class="news__item" style = "order:${orderedNumber} ">
//     <article class="news__article">
//         <div class="news__wrapper">
//         <img class="news__img" src= ${multimedia !== null ? multimedia[0].url : sonic}
//                  alt="">
//             <p class="news__category">Job searching</p>
//             <p class="news__favorite">Add to favorite
    
//                 <svg class="news__icon" width="16" height="16">
//                     <use href="./images/sprite.svg#icon-like-stroke"></use>
//                     <use href="./images/sprite.svg#like"></use>
//                 </svg>
    
//             </p>
//         </div>
//         <h2 class=" news__title">${title}
//         </h2>
//         <p class="news__description">${abstract}</p>
//         <div class="news__info">
//             <span class="news__date">${published_date}
    
//             </span>
//             <a class="news__link-more" href="#">Read more</a>
//         </div>
//     </article>
//     </li>`
// }
function updateNewList( markup){
    // refs.newsList.insertAdjacentHTML('beforeend', markup);
    refs.newsList.innerHTML = markup
}

function createMarkupWidgetWeather(){
   return `<li class =" news__item location_weather"  ><div class=" news__weather"><p class = "text_weather">Weather<p></div></li>`
}

export{renderNewsList,updateNewList,createMarkupWidgetWeather,orderedNumber}


// It doesn't work!!! Why?
// function  increaseQuantityOfOrder(orderedNumber){
// orderedNumber += 1
//   }
// function reset(orderedNumber){
//     orderedNumber = 0
// }