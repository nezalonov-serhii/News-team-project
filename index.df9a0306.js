var e={getPopular:async function(){const e=await fetch("https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=Z00b2slf3ZsaEzZO55XflcVUrAbznmza");if(e.ok){return(await e.json()).results}throw new Error(e.statusText)}};const n=document.querySelector(".news__item");function s({title:e,media:n,url:s,published_date:t,section:a,abstract:o}){return`\n            <li class="news__item">\n                <article class="news__article">\n                    <div class="news__wrapper">\n                        <img class="news__img" src="${n[0]["media-metadata"][2].url}" alt="">\n                        <p class="news__category">${a}</p>\n                        <p class="news__favorite">Add to favorite\n\n                            <svg class="news__icon" width="16" height="16" viewBox="0 0 37 32">\n                                \n                                <path fill="none" stroke="#4440f7" style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2" d="M9.333 4c-3.681 0-6.667 2.955-6.667 6.6 0 2.943 1.167 9.927 12.651 16.987 0.206 0.125 0.442 0.191 0.683 0.191s0.477-0.066 0.683-0.191c11.484-7.060 12.651-14.044 12.651-16.987 0-3.645-2.985-6.6-6.667-6.6s-6.667 4-6.667 4-2.985-4-6.667-4z"></path>\n\n                            </svg>\n\n                        </p>\n                    </div>\n                    <h2 class=" news__title">${e}</h2>\n                    <p class="news__description">${o}</p>\n                    <div class="news__info">\n                        <span class="news__date">${t}</span>\n                        <a class="news__link-more" href="${s}">Read more</a>\n                    </div>\n                </article>\n            </li>\n    `}e.getPopular().then((e=>{var t,a;console.log(e[0]),console.log(s(e[0])),t=n,a=s(e[0]),t.insertAdjacentHTML("beforeend",a)}));(async function(e){return(await fetch(`https://api.openweathermap.org/data/2.5/weather??units=metric&q=${e}&appid=adbfcea561ee5005b6167772340c12ff`)).json()})("London").then((e=>console.log(e)));document.querySelector("body");
//# sourceMappingURL=index.df9a0306.js.map