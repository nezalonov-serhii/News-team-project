!function(){function e(e,t,o,r){Object.defineProperty(e,t,{get:o,set:r,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},i=o.parcelRequired7c6;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},o.parcelRequired7c6=i),i.register("cqmI4",(function(t,o){e(t.exports,"refs",(function(){return r}));var r={body:document.querySelector("body"),main:document.querySelector("main"),loader:document.querySelector(".loader-backdrop"),form:document.querySelector(".search"),filterCategories:document.querySelector(".filter__wrap"),filterOthers:document.getElementById("filter-others"),newsList:document.querySelector(".news__lists"),favorite:document.querySelector(".news"),favoriteLists:document.querySelector(".news__lists"),errorSearch:document.querySelector(".error-search"),categoryWrapper:document.querySelector(".js-category-wrapper"),mainCategories:document.querySelector(".js-main-categories"),showOthersBtn:document.querySelector(".js-btn-show-others"),dropdownList:document.querySelector(".js-dropdown-list"),readNewsContainer:document.querySelector(".read-news__container"),celendarDate:document.querySelector("#choseDataButton")}})),i.register("axkxc",(function(e,t){var o,r,n,c,u=i("gnsaF");o=document.querySelector(".js-menu-container"),r=document.querySelector(".js-open-menu"),n=document.querySelector(".js-close-menu"),c=function(){var e="true"===r.getAttribute("aria-expanded")||!1;r.setAttribute("aria-expanded",!e),o.classList.toggle("is-open"),(e?u.enableBodyScroll:u.disableBodyScroll)(document.body)},r.addEventListener("click",c),n.addEventListener("click",c),window.matchMedia("(min-width: 768px)").addEventListener("change",(function(e){e.matches&&(o.classList.remove("is-open"),r.setAttribute("aria-expanded",!1),(0,u.enableBodyScroll)(document.body))}))})),i.register("gnsaF",(function(t,o){e(t.exports,"disableBodyScroll",(function(){return v})),e(t.exports,"enableBodyScroll",(function(){return g}));var r=!1;if("undefined"!=typeof window){var n={get passive(){r=!0}};window.addEventListener("testPassive",null,n),window.removeEventListener("testPassive",null,n)}var i="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),c=[],u=!1,l=-1,a=void 0,d=void 0,s=void 0,f=function(e){return c.some((function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(e))}))},m=function(e){var t=e||window.event;return!!f(t.target)||(t.touches.length>1||(t.preventDefault&&t.preventDefault(),!1))},y=function(){void 0!==s&&(document.body.style.paddingRight=s,s=void 0),void 0!==a&&(document.body.style.overflow=a,a=void 0)},p=function(){if(void 0!==d){var e=-parseInt(document.body.style.top,10),t=-parseInt(document.body.style.left,10);document.body.style.position=d.position,document.body.style.top=d.top,document.body.style.left=d.left,window.scrollTo(t,e),d=void 0}},v=function(e,t){if(e){if(!c.some((function(t){return t.targetElement===e}))){var o={targetElement:e,options:t||{}};c=[].concat(function(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}(c),[o]),i?window.requestAnimationFrame((function(){if(void 0===d){d={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var e=window,t=e.scrollY,o=e.scrollX,r=e.innerHeight;document.body.style.position="fixed",document.body.style.top=-t,document.body.style.left=-o,setTimeout((function(){return window.requestAnimationFrame((function(){var e=r-window.innerHeight;e&&t>=r&&(document.body.style.top=-(t+e))}))}),300)}})):function(e){if(void 0===s){var t=!!e&&!0===e.reserveScrollBarGap,o=window.innerWidth-document.documentElement.clientWidth;if(t&&o>0){var r=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);s=document.body.style.paddingRight,document.body.style.paddingRight=r+o+"px"}}void 0===a&&(a=document.body.style.overflow,document.body.style.overflow="hidden")}(t),i&&(e.ontouchstart=function(e){1===e.targetTouches.length&&(l=e.targetTouches[0].clientY)},e.ontouchmove=function(t){1===t.targetTouches.length&&function(e,t){var o=e.targetTouches[0].clientY-l;!f(e.target)&&(t&&0===t.scrollTop&&o>0||function(e){return!!e&&e.scrollHeight-e.scrollTop<=e.clientHeight}(t)&&o<0?m(e):e.stopPropagation())}(t,e)},u||(document.addEventListener("touchmove",m,r?{passive:!1}:void 0),u=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},g=function(e){e?(c=c.filter((function(t){return t.targetElement!==e})),i&&(e.ontouchstart=null,e.ontouchmove=null,u&&0===c.length&&(document.removeEventListener("touchmove",m,r?{passive:!1}:void 0),u=!1)),i?p():y()):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")}})),i.register("6hVZA",(function(e,t){var o=document.querySelector("#home"),r=document.querySelector("#favourite"),n=document.querySelector("#read"),i=[o,r,n],c=localStorage.getItem("currentPage")||"home";function u(e){console.log(e.currentTarget),i.forEach((function(e){e.classList.remove("mobile-menu__current")})),e.currentTarget.classList.add("mobile-menu__current"),localStorage.setItem("currentPage",e.currentTarget.id)}document.querySelector("#".concat(c)).classList.add("mobile-menu__current"),o.addEventListener("click",u),r.addEventListener("click",u),n.addEventListener("click",u)})),i.register("aSK8U",(function(e,t){var o,r,n;o=!1,r=document.querySelectorAll(".nav__link"),n=document.URL,r.forEach((function(e){n.includes(e.pathname)&&(e.classList.add("nav__link--current"),o=!0)})),!o&&document.querySelector('.nav__link[href*="/index.html"]').classList.add("nav__link--current")})),i.register("bm0i6",(function(e,o){var r=i("8nrFW");i("cqmI4");var n=document.querySelectorAll(".switch-checkbox"),c=document.querySelector("body"),u=document.querySelector(".theme__dark"),l=document.querySelector(".theme__light");function a(){c.classList.toggle("darkMode"),u.classList.toggle("opacityForDark"),l.classList.toggle("opacityForDark"),"dark"!==localStorage.getItem("theme")?localStorage.setItem("theme","dark"):localStorage.removeItem("theme")}t(r)(n).map((function(e){return e.addEventListener("click",a)})),function(){try{"dark"===localStorage.getItem("theme")&&(c.classList.add("darkMode"),changeThemeBtn.checked=!0)}catch(e){}}()})),i.register("8nrFW",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e){return o.default(e)||r.default(e)||c.default(e)||n.default()};var o=u(i("kMC0W")),r=u(i("7AJDX")),n=u(i("8CtQK")),c=u(i("auk6i"));function u(e){return e&&e.__esModule?e:{default:e}}})),i.register("kMC0W",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e){if(Array.isArray(e))return r.default(e)};var o,r=(o=i("8NIkP"))&&o.__esModule?o:{default:o}})),i.register("8NIkP",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,r=new Array(t);o<t;o++)r[o]=e[o];return r}})),i.register("7AJDX",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}})),i.register("8CtQK",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}})),i.register("auk6i",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){if(!e)return;if("string"==typeof e)return r.default(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);"Object"===o&&e.constructor&&(o=e.constructor.name);if("Map"===o||"Set"===o)return Array.from(o);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return r.default(e,t)};var o,r=(o=i("8NIkP"))&&o.__esModule?o:{default:o}}))}();
//# sourceMappingURL=read.9c6aea42.js.map
