function e(e,t,o,n){Object.defineProperty(e,t,{get:o,set:n,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){n[e]=t},t.parcelRequired7c6=r),r.register("3ILHO",(function(t,o){e(t.exports,"refs",(function(){return n}));const n={body:document.querySelector("body"),main:document.querySelector("main"),loader:document.querySelector(".loader-backdrop"),form:document.querySelector(".search"),filterCategories:document.querySelector(".filter__wrap"),filterOthers:document.getElementById("filter-others"),newsList:document.querySelector(".news__lists"),favorite:document.querySelector(".news"),favoriteLists:document.querySelector(".news__lists"),errorSearch:document.querySelector(".error-search"),categoryWrapper:document.querySelector(".js-category-wrapper"),mainCategories:document.querySelector(".js-main-categories"),showOthersBtn:document.querySelector(".js-btn-show-others"),dropdownList:document.querySelector(".js-dropdown-list"),readNewsContainer:document.querySelector(".read-news__container"),celendarDate:document.querySelector("#choseDataButton"),prevBtn:document.querySelector(".prev-page"),nextBtn:document.querySelector(".next-page"),pgContainer:document.querySelector("#pagination")}})),r.register("fPIMx",(function(e,t){var o=r("jQ7WT");(()=>{const e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),n=document.querySelector(".js-close-menu"),r=()=>{const n="true"===t.getAttribute("aria-expanded")||!1;t.setAttribute("aria-expanded",!n),e.classList.toggle("is-open");(n?o.enableBodyScroll:o.disableBodyScroll)(document.body)};t.addEventListener("click",r),n.addEventListener("click",r),window.matchMedia("(min-width: 768px)").addEventListener("change",(n=>{n.matches&&(e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1),(0,o.enableBodyScroll)(document.body))}))})()})),r.register("jQ7WT",(function(t,o){e(t.exports,"disableBodyScroll",(function(){return v})),e(t.exports,"enableBodyScroll",(function(){return p}));var n=!1;if("undefined"!=typeof window){var r={get passive(){n=!0}};window.addEventListener("testPassive",null,r),window.removeEventListener("testPassive",null,r)}var c="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),i=[],d=!1,l=-1,a=void 0,u=void 0,s=void 0,m=function(e){return i.some((function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(e))}))},y=function(e){var t=e||window.event;return!!m(t.target)||(t.touches.length>1||(t.preventDefault&&t.preventDefault(),!1))},f=function(){void 0!==s&&(document.body.style.paddingRight=s,s=void 0),void 0!==a&&(document.body.style.overflow=a,a=void 0)},g=function(){if(void 0!==u){var e=-parseInt(document.body.style.top,10),t=-parseInt(document.body.style.left,10);document.body.style.position=u.position,document.body.style.top=u.top,document.body.style.left=u.left,window.scrollTo(t,e),u=void 0}},v=function(e,t){if(e){if(!i.some((function(t){return t.targetElement===e}))){var o={targetElement:e,options:t||{}};i=[].concat(function(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}(i),[o]),c?window.requestAnimationFrame((function(){if(void 0===u){u={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var e=window,t=e.scrollY,o=e.scrollX,n=e.innerHeight;document.body.style.position="fixed",document.body.style.top=-t,document.body.style.left=-o,setTimeout((function(){return window.requestAnimationFrame((function(){var e=n-window.innerHeight;e&&t>=n&&(document.body.style.top=-(t+e))}))}),300)}})):function(e){if(void 0===s){var t=!!e&&!0===e.reserveScrollBarGap,o=window.innerWidth-document.documentElement.clientWidth;if(t&&o>0){var n=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);s=document.body.style.paddingRight,document.body.style.paddingRight=n+o+"px"}}void 0===a&&(a=document.body.style.overflow,document.body.style.overflow="hidden")}(t),c&&(e.ontouchstart=function(e){1===e.targetTouches.length&&(l=e.targetTouches[0].clientY)},e.ontouchmove=function(t){1===t.targetTouches.length&&function(e,t){var o=e.targetTouches[0].clientY-l;!m(e.target)&&(t&&0===t.scrollTop&&o>0||function(e){return!!e&&e.scrollHeight-e.scrollTop<=e.clientHeight}(t)&&o<0?y(e):e.stopPropagation())}(t,e)},d||(document.addEventListener("touchmove",y,n?{passive:!1}:void 0),d=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},p=function(e){e?(i=i.filter((function(t){return t.targetElement!==e})),c&&(e.ontouchstart=null,e.ontouchmove=null,d&&0===i.length&&(document.removeEventListener("touchmove",y,n?{passive:!1}:void 0),d=!1)),c?g():f()):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")}})),r.register("6Faym",(function(e,t){const o=document.querySelector("#home"),n=document.querySelector("#favourite"),r=document.querySelector("#read"),c=document.querySelector(".logo"),i=document.querySelector("#mob-logo"),d=[o,n,r],l=localStorage.getItem("currentPage")||"home";function a(e){console.log(e.currentTarget),d.forEach((e=>{e.classList.remove("mobile-menu__current")})),e.currentTarget.classList.add("mobile-menu__current"),localStorage.setItem("currentPage",e.currentTarget.id)}function u(e){d.forEach((e=>{e.classList.remove("mobile-menu__current")})),o.classList.add("mobile-menu__current"),localStorage.setItem("currentPage",o.id)}document.querySelector(`#${l}`).classList.add("mobile-menu__current"),o.addEventListener("click",a),n.addEventListener("click",a),r.addEventListener("click",a),c.addEventListener("click",u),i.addEventListener("click",u)})),r.register("byseg",(function(e,t){!function(){let e=!1;const t=document.querySelectorAll(".nav__link"),o=document.URL;t.forEach((t=>{o.includes(t.pathname)&&(t.classList.add("nav__link--current"),e=!0)})),!e&&document.querySelector('.nav__link[href*="/index.html"]').classList.add("nav__link--current")}()})),r.register("kj6pq",(function(e,t){r("3ILHO");const o=document.querySelector(".switch-checkbox"),n=document.querySelector("body"),c=document.querySelector(".theme__dark"),i=document.querySelector(".theme__light");o.addEventListener("click",(function(){n.classList.toggle("darkMode"),c.classList.toggle("opacityForDark"),i.classList.toggle("opacityForDark"),"dark"!==localStorage.getItem("theme")?localStorage.setItem("theme","dark"):localStorage.removeItem("theme")})),function(){try{"dark"===localStorage.getItem("theme")&&(n.classList.add("darkMode"),o.checked=!0)}catch(e){}}()}));
//# sourceMappingURL=read.2b22e854.js.map
