!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var i={id:e,exports:{}};return r[e]=i,n.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,r){t[e]=r},e.parcelRequired7c6=n),n.register("2kS5c",(function(e,r){var t=n("cqmI4"),i=n("5foIc"),a=n("idKKJ"),s=n("d3YbE"),d=localStorage.getItem("news"),o=JSON.parse(d);if(!o)return t.refs.errorSearch.classList.remove("is-hidden"),void t.refs.favorite.classList.add("is-hidden");var l=o.filter((function(e){return!0===e.favorite}));if(l.length<1)return t.refs.errorSearch.classList.remove("is-hidden"),void t.refs.favorite.classList.add("is-hidden");l.map((function(e){var r,n;r=t.refs.favoriteLists,n=(0,s.createNewsCard)(e),r.insertAdjacentHTML("beforeend",n)})),t.refs.favoriteLists.addEventListener("click",i.btnAddToFavorite),t.refs.favorite.addEventListener("click",a.linkReadMore),t.refs.form.addEventListener("submit",(function(e){e.preventDefault();var r=e.target.elements.inputSearch,n=r.value.trim().toLowerCase();console.log(n);var i=l.filter((function(e){return e.title.toLowerCase().includes(n)}));if(i.length){var a=i.map((function(e){return(0,s.createNewsCard)(e)})).join("");t.refs.favoriteLists.innerHTML=a,t.refs.errorSearch.classList.add("is-hidden"),t.refs.favoriteLists.classList.remove("is-hidden")}else t.refs.errorSearch.classList.remove("is-hidden"),t.refs.favoriteLists.classList.add("is-hidden");e.target.reset(),r.blur()}))})),n.register("idKKJ",(function(e,r){var t,i,a,s;t=e.exports,i="linkReadMore",a=function(){return l},Object.defineProperty(t,i,{get:a,set:s,enumerable:!0,configurable:!0});var d=n("d3YbE"),o=document.querySelector(".news__item");function l(e){var r,t=e.target.closest(".news__link-more");t&&(t.parentNode.parentNode.parentNode.classList.add("opacity"),function(e){var r=localStorage.getItem("news"),t=[];r&&(t=JSON.parse(r));var n=t.findIndex((function(r){return r.id===e.closest(".news__article").dataset.id||r.id===e.closest(".news__article").id})),i=new Date,a={year:"numeric",month:"numeric",day:"numeric"},s=i.toLocaleDateString([],a).replaceAll(".","/");if(n>-1)return t[n].read=!0,t[n].dayRead=i.toLocaleDateString([],a).replaceAll(".","/"),void localStorage.setItem("news",JSON.stringify(t));var o={id:e.parentNode.parentNode.dataset.id,uri:e.nextElementSibling.textContent,published_date:e.parentNode.firstElementChild.innerText,media:e.parentNode.parentNode.childNodes[1].children[0].currentSrc,title:e.parentNode.parentNode.childNodes[3].children[0].innerText,abstract:(0,d.newsCardTextFormat)(e.parentNode.parentNode.childNodes[3].children[1].innerText),url:e.parentNode.children[1].href,read:!0,favorite:!1,section:e.parentNode.parentNode.childNodes[1].children[1].innerHTML,dayRead:s};t.push(o),localStorage.setItem("news",JSON.stringify(t))}(t),e.target.closest(".news__article").parentNode.children[0].children[0].children[2].classList.remove("hidden"),o.insertAdjacentHTML("afterbegin",r))}})),n("cqmI4"),n("axkxc"),n("6hVZA"),n("2kS5c"),n("aSK8U"),n("bm0i6")}();
//# sourceMappingURL=favorite.39707fcc.js.map
