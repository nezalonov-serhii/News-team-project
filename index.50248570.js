!function(){function t(t){return t&&t.__esModule?t.default:t}var e=!1;if("undefined"!=typeof window){var n={get passive(){e=!0}};window.addEventListener("testPassive",null,n),window.removeEventListener("testPassive",null,n)}var r,o,i,a,c="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),s=[],l=!1,u=-1,d=void 0,f=void 0,h=void 0,v=function(t){return s.some((function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))}))},p=function(t){var e=t||window.event;return!!v(e.target)||(e.touches.length>1||(e.preventDefault&&e.preventDefault(),!1))},y=function(){void 0!==h&&(document.body.style.paddingRight=h,h=void 0),void 0!==d&&(document.body.style.overflow=d,d=void 0)},m=function(){if(void 0!==f){var t=-parseInt(document.body.style.top,10),e=-parseInt(document.body.style.left,10);document.body.style.position=f.position,document.body.style.top=f.top,document.body.style.left=f.left,window.scrollTo(e,t),f=void 0}},g=function(t,n){if(t){if(!s.some((function(e){return e.targetElement===t}))){var r={targetElement:t,options:n||{}};s=[].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(s),[r]),c?window.requestAnimationFrame((function(){if(void 0===f){f={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left};var t=window,e=t.scrollY,n=t.scrollX,r=t.innerHeight;document.body.style.position="fixed",document.body.style.top=-e,document.body.style.left=-n,setTimeout((function(){return window.requestAnimationFrame((function(){var t=r-window.innerHeight;t&&e>=r&&(document.body.style.top=-(e+t))}))}),300)}})):function(t){if(void 0===h){var e=!!t&&!0===t.reserveScrollBarGap,n=window.innerWidth-document.documentElement.clientWidth;if(e&&n>0){var r=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);h=document.body.style.paddingRight,document.body.style.paddingRight=r+n+"px"}}void 0===d&&(d=document.body.style.overflow,document.body.style.overflow="hidden")}(n),c&&(t.ontouchstart=function(t){1===t.targetTouches.length&&(u=t.targetTouches[0].clientY)},t.ontouchmove=function(e){1===e.targetTouches.length&&function(t,e){var n=t.targetTouches[0].clientY-u;!v(t.target)&&(e&&0===e.scrollTop&&n>0||function(t){return!!t&&t.scrollHeight-t.scrollTop<=t.clientHeight}(e)&&n<0?p(t):t.stopPropagation())}(e,t)},l||(document.addEventListener("touchmove",p,e?{passive:!1}:void 0),l=!0))}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")},w=function(t){t?(s=s.filter((function(e){return e.targetElement!==t})),c&&(t.ontouchstart=null,t.ontouchmove=null,l&&0===s.length&&(document.removeEventListener("touchmove",p,e?{passive:!1}:void 0),l=!1)),c?m():y()):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.")};r=document.querySelector(".js-menu-container"),o=document.querySelector(".js-open-menu"),i=document.querySelector(".js-close-menu"),a=function(){var t="true"===o.getAttribute("aria-expanded")||!1;o.setAttribute("aria-expanded",!t),r.classList.toggle("is-open"),(t?w:g)(document.body)},o.addEventListener("click",a),i.addEventListener("click",a),window.matchMedia("(min-width: 768px)").addEventListener("change",(function(t){t.matches&&(r.classList.remove("is-open"),o.setAttribute("aria-expanded",!1),w(document.body))}));var b={};function _(t,e,n,r,o,i,a){try{var c=t[i](a),s=c.value}catch(t){return void n(t)}c.done?e(s):Promise.resolve(s).then(r,o)}Object.defineProperty(b,"__esModule",{value:!0}),b.default=function(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){_(i,r,o,a,c,"next",t)}function c(t){_(i,r,o,a,c,"throw",t)}a(void 0)}))}};var x={},L=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,n){return t[e]=n}}function l(t,e,n,r){var o=e&&e.prototype instanceof y?e:y,i=Object.create(o.prototype),a=new T(r||[]);return i._invoke=function(t,e,n){var r=d;return function(o,i){if(r===h)throw new Error("Generator is already running");if(r===v){if("throw"===o)throw i;return P()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=S(a,n);if(c){if(c===p)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===d)throw r=v,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=h;var s=u(t,e,n);if("normal"===s.type){if(r=n.done?v:f,s.arg===p)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=v,n.method="throw",n.arg=s.arg)}}}(t,n,a),i}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var d="suspendedStart",f="suspendedYield",h="executing",v="completed",p={};function y(){}function m(){}function g(){}var w={};s(w,i,(function(){return this}));var b=Object.getPrototypeOf,_=b&&b(b(O([])));_&&_!==n&&r.call(_,i)&&(w=_);var x=g.prototype=y.prototype=Object.create(w);function L(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function n(o,i,a,c){var s=u(t[o],t,i);if("throw"!==s.type){var l=s.arg,d=l.value;return d&&"object"==typeof d&&r.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(d).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,c)}))}c(s.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function S(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,S(t,n),"throw"===n.method))return p;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var o=u(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,p;var i=o.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,p):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,p)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function O(t){if(t){var n=t[i];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function n(){for(;++o<t.length;)if(r.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}return{next:P}}function P(){return{value:e,done:!0}}return m.prototype=g,s(x,"constructor",g),s(g,"constructor",m),m.displayName=s(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,s(t,c,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},L(E.prototype),s(E.prototype,a,(function(){return this})),t.AsyncIterator=E,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new E(l(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(x),s(x,c,"Generator"),s(x,i,(function(){return this})),s(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=O,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(r,o){return c.type="throw",c.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var s=r.call(a,"catchLoc"),l=r.call(a,"finallyLoc");if(s&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),j(n),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;j(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:O(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),p}},t}(x);try{regeneratorRuntime=L}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=L:Function("r","regeneratorRuntime = r")(L)}var E="api-key=ccA9QsXbvrHhGuvowEcHjyxEU2jAukPO",S="https://api.nytimes.com/svc";function k(){return(k=t(b)(t(x).mark((function e(){var n,r;return t(x).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(S,"/mostpopular/v2/viewed/1.json?").concat(E));case 2:if(!(n=t.sent).ok){t.next=8;break}return t.next=6,n.json();case 6:return r=t.sent,t.abrupt("return",r.results);case 8:throw new Error(n.statusText);case 9:case"end":return t.stop()}}),e)})))).apply(this,arguments)}var j=document.querySelector(".news__item");console.log(j);var T=document.querySelector("button");console.log(T),function(){return k.apply(this,arguments)}().then((function(t){var e,n,r,o,i,a,c,s,l;!function(t,e){t.insertAdjacentHTML("beforeend",e)}(j,(r=t[7],o=r.title,i=r.media,a=r.url,c=r.published_date,s=r.section,l=r.abstract,'\n            <li class="news__item">\n                <article class="news__article">\n                    <div class="news__wrapper">\n                        <img class="news__img" src="'.concat(i[0]["media-metadata"][2].url,'" alt="">\n                        <p class="news__category">').concat(s,'</p>\n\n                        <button type="button" class=" btn news__add-to-favorite ">\n                        <span class="news__add-to-favorite-btn">Add to favorite\n                           <svg class="news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">\n                                  <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>\n                        </svg></span>\n                                \n                        <span class="news__remove-to-favorite-btn hidden">Remove from favorite\n                        <svg class="item-news__block-icon active-news-icon" width="16" height="16" viewBox="0 0 37 32">\n                        <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>\n                        </svg></span>      \n\n\n                        </button>\n                        \n                        \n\n                        \n                    </div>\n                    <div class="new__text-wrapper">\n                    <h2 class=" news__title">').concat(o,'</h2>\n                    <p class="news__description">').concat((e=l,n=e,n.length>80&&(n=e.slice(0,80)+"..."),n),'</p>\n                    </div>\n                    <div class="news__info">\n                        <span class="news__date">').concat(c,'</span>\n                        <a class="news__link-more" href="').concat(a,'">Read more</a>\n                    </div>\n                </article>\n            </li>\n    ')))})),j.addEventListener("click",(function(t){var e=t.target.closest(".news__add-to-favorite"),n=t.target.closest(".news__add-to-favorite-btn"),r=t.target.closest(".news__remove-to-favorite-btn ");if(console.log(e),console.log(n),console.log(r),!e)return;P();var o=e.parentNode.nextElementSibling.nextElementSibling.lastElementChild.textContent;if(console.log(o),!n.classList.contains("hidden"))return n.classList.add("hidden"),void addToFavoriteLocal(e);e.classList.remove("hidden");for(var i=0;i<O.length;i+=1)O[i].uri===o&&O.splice(i,1);localStorage.setItem("newsSection",JSON.stringify(O))}));var O=[];function P(){O=null!==JSON.parse(localStorage.getItem("newsSection"))?JSON.parse(localStorage.getItem("newsSection")):[]}P();document.querySelector("body")}();
//# sourceMappingURL=index.50248570.js.map
