!function(){function e(e,n,t,r){Object.defineProperty(e,n,{get:t,set:r,enumerable:!0,configurable:!0})}function n(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},s={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in s){var n=s[e];delete s[e];var t={id:e,exports:{}};return r[e]=t,n.call(t.exports,t,t.exports),t.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){s[e]=n},t.parcelRequired7c6=o),o.register("iE7OH",(function(n,t){var r,s;e(n.exports,"register",(function(){return r}),(function(e){return r=e})),e(n.exports,"resolve",(function(){return s}),(function(e){return s=e}));var o={};r=function(e){for(var n=Object.keys(e),t=0;t<n.length;t++)o[n[t]]=e[n[t]]},s=function(e){var n=o[e];if(null==n)throw new Error("Could not resolve bundle with id "+e);return n}})),o.register("aNJCr",(function(n,t){var r;e(n.exports,"getBundleURL",(function(){return r}),(function(e){return r=e}));var s={};function o(e){return(""+e).replace(/^((?:https?|file|ftp|(chrome|moz)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}r=function(e){var n=s[e];return n||(n=function(){try{throw new Error}catch(n){var e=(""+n.stack).match(/(https?|file|ftp|(chrome|moz)-extension):\/\/[^)\n]+/g);if(e)return o(e[2])}return"/"}(),s[e]=n),n}})),o("iE7OH").register(JSON.parse('{"3hZM1":"read.dabb7c23.js","ee16w":"sprite.8c8f8f06.svg","2A9O9":"read.fe608150.js"}'));var i=o("cqmI4");o("axkxc"),o("6hVZA"),o("aSK8U"),o("bm0i6");var a;i=o("cqmI4");a=o("aNJCr").getBundleURL("3hZM1")+o("iE7OH").resolve("ee16w");var c=o("5foIc");function l(e){e.target.classList.toggle("isOpen")}function d(){i.refs.errorSearch.classList.remove("is-hidden"),i.refs.readNewsContainer.classList.add("is-hidden")}!function(){var e=function(e){var s=r.filter((function(n){return n.dayRead===f[e]})).map((function(e){return t=(n=e).id,r=n.media,s=n.title,o=n.url,i=n.published_date,a=n.section,c=n.abstract,l=n.uri,n.read,d=n.favorite,'\n      <li class="news__item">\n        <article class="news__article" id="'.concat(t,'">\n                    <div class="news__wrapper" >\n                        <img class="news__img" src="').concat(r,'" alt="">\n                        <p class="news__category">').concat(a,'</p>\n\n                        <button type="button" class="item-news__add-to-favorite ').concat(d?"hidden-span":"",'">\n                          Add to favorite\n                            <svg class="item-news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">\n                                    <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>\n                            </svg></span>\n                                    <span class="item-news__remove-to-favorite-btn">Remove from favorite\n                            <svg class="item-news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">\n                                    <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>\n                            </svg>\n                        </button>             \n                    </div>\n                    <div class="new__text-wrapper">\n                    <h2 class=" news__title">').concat(s,'</h2>\n                    <p class="news__description">').concat(c,'</p>\n                    </div>\n                    <div class="news__info">\n                        <span class="news__date">').concat(i,'</span>\n                        <a target="_blank" class="news__link-more" href="').concat(o,'">Read more</a>\n                        <p class="hidden">').concat(l,"</p>\n                    </div>\n                </article>\n      </li>");var n,t,r,s,o,i,a,c,l,d})).join("");t+='<div class="read-news__list">\n      <button class="read-news__btn js-read-news-btn">\n        <span>'.concat(f[e],'</span>\n        <svg><use href="').concat(n(a)+"#arrow-down",'"></use></svg>\n      </button>\n      <ul class="news__lists">\n        ').concat(s,"\n      </ul>\n    </div>")},t="",r=function(e){try{var n=localStorage.getItem(e);return null===n?void 0:JSON.parse(n)}catch(e){i.refs.errorSearch.classList.remove("is-hidden"),i.refs.readNewsContainer.classList.add("is-hidden")}}("news");if(r){var s=r.filter((function(e){return!0===e.read}));if(console.log(s),s.length<1)d();else{var o=r.map((function(e){return e.dayRead}));o.length<1&&d();var u,f=Array.from(new Set(o)).filter((function(e){return void 0!==e})).sort((function(e,n){return n.localeCompare(e)}));console.log(f);for(var v=0;v<f.length;v+=1)e(v);i.refs.readNewsContainer.insertAdjacentHTML("beforeend",t),u=document.querySelectorAll(".js-read-news-btn"),document.querySelectorAll(".item-news__add-to-favorite"),document.querySelectorAll(".read-news__list"),u.forEach((function(e){return e.addEventListener("click",l)})),i.refs.readNewsContainer.addEventListener("click",c.btnAddToFavorite)}}else d()}()}();
//# sourceMappingURL=read.dabb7c23.js.map
