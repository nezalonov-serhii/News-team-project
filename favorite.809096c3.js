!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},s=e.parcelRequired7c6;null==s&&((s=function(e){if(e in n)return n[e].exports;if(e in t){var s=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,s.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){t[e]=n},e.parcelRequired7c6=s),s("cqmI4"),s("axkxc"),s("6hVZA");var i=s("cqmI4");i=s("cqmI4");function o(){var e=localStorage.getItem("newsSection");0===JSON.parse(e).length?(i.refs.errorSearch.classList.remove("is-hidden"),i.refs.favorite.classList.add("is-hidden"),console.log(i.refs.favorite)):(i.refs.errorSearch.classList.add("is-hidden"),i.refs.favorite.classList.remove("is-hidden"))}console.log(i.refs.favorite);var r=localStorage.getItem("newsSection"),a=JSON.parse(r);function c(e){var n=e.id,t=e.category,s=e.date,i=e.description,o=(e.favorite,e.img),r=e.title,a=e.uri;return'\n    <li class="news__item ">\n     <article class="news__article" data-id="'.concat(n,'">\n                    <div class="news__wrapper" >\n                        <img class="news__img" src="').concat(o,'" alt="">\n\n                        <p class="news__category">').concat(t,'</p>\n\n                        <button type="button" class="item-news__add-to-favorite ">\n                          Add to favorite\n                            <svg class="item-news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">\n                                    <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>\n                                    </svg></span>\n                                    <span class="item-news__remove-to-favorite-btn">Remove from favorite\n                                    <svg class="item-news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">\n                                    <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>\n                                    </svg>\n                          </button>\n\n                    </div>\n                    <div class="new__text-wrapper">\n                    <h2 class=" news__title">').concat(r,'</h2>\n                    <p class="news__description">').concat(i,'</p>\n                    </div>\n                    <div class="news__info">\n                        <span class="news__date">').concat(s,'</span>\n                        <a target="_blank" class="news__link-more" href="').concat(a,'">Read more</a>\n                    </div>\n                </article>\n    </li>\n    ')}function l(e,n){e.insertAdjacentHTML("beforeend",n)}o(),a.map((function(e){l(i.refs.favoriteLists,c(e))})),i.refs.favoriteLists.addEventListener("click",(function(e){if("BUTTON"!==e.target.nodeName&&"path"!==e.target.nodeName)return;var n=e.target.closest(".news__article").dataset.id,t=a.findIndex((function(e){return e.id===n}));localStorage.removeItem("newsSection"),a.splice(t,1),localStorage.setItem("newsSection",JSON.stringify(a)),i.refs.favoriteLists.innerHTML="",console.log(a),o(),a.map((function(e){l(i.refs.favoriteLists,c(e))}))}))}();
//# sourceMappingURL=favorite.809096c3.js.map
