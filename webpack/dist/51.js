/*! For license information please see 51.js.LICENSE.txt */
"use strict";(self.webpackChunkmy_webpack_project=self.webpackChunkmy_webpack_project||[]).push([[51],{51:(t,e,r)=>{r.r(e),r.d(e,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var n=r(278);function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}function _regeneratorRuntime(){_regeneratorRuntime=function _regeneratorRuntime(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function define(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{define({},"")}catch(t){define=function define(t,e,r){return t[e]=r}}function wrap(t,e,r,o){var a=e&&e.prototype instanceof Generator?e:Generator,i=Object.create(a.prototype),c=new Context(o||[]);return n(i,"_invoke",{value:makeInvokeMethod(t,r,c)}),i}function tryCatch(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=wrap;var u={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var l={};define(l,a,(function(){return this}));var s=Object.getPrototypeOf,f=s&&s(s(values([])));f&&f!==e&&r.call(f,a)&&(l=f);var h=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(l);function defineIteratorMethods(t){["next","throw","return"].forEach((function(e){define(t,e,(function(t){return this._invoke(e,t)}))}))}function AsyncIterator(t,e){function invoke(n,o,a,i){var c=tryCatch(t[n],t,o);if("throw"!==c.type){var u=c.arg,l=u.value;return l&&"object"==_typeof(l)&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){invoke("next",t,a,i)}),(function(t){invoke("throw",t,a,i)})):e.resolve(l).then((function(t){u.value=t,a(u)}),(function(t){return invoke("throw",t,a,i)}))}i(c.arg)}var o;n(this,"_invoke",{value:function value(t,r){function callInvokeWithMethodAndArg(){return new e((function(e,n){invoke(t,r,e,n)}))}return o=o?o.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}})}function makeInvokeMethod(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return doneResult()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=maybeInvokeDelegate(i,r);if(c){if(c===u)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var l=tryCatch(t,e,r);if("normal"===l.type){if(n=r.done?"completed":"suspendedYield",l.arg===u)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n="completed",r.method="throw",r.arg=l.arg)}}}function maybeInvokeDelegate(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,maybeInvokeDelegate(t,e),"throw"===e.method))return u;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return u}var n=tryCatch(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,u;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,u):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,u)}function pushTryEntry(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function resetTryEntry(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function Context(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(pushTryEntry,this),this.reset(!0)}function values(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function next(){for(;++n<t.length;)if(r.call(t,n))return next.value=t[n],next.done=!1,next;return next.value=void 0,next.done=!0,next};return o.next=o}}return{next:doneResult}}function doneResult(){return{value:void 0,done:!0}}return GeneratorFunction.prototype=GeneratorFunctionPrototype,n(h,"constructor",{value:GeneratorFunctionPrototype,configurable:!0}),n(GeneratorFunctionPrototype,"constructor",{value:GeneratorFunction,configurable:!0}),GeneratorFunction.displayName=define(GeneratorFunctionPrototype,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===GeneratorFunction||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,GeneratorFunctionPrototype):(t.__proto__=GeneratorFunctionPrototype,define(t,c,"GeneratorFunction")),t.prototype=Object.create(h),t},t.awrap=function(t){return{__await:t}},defineIteratorMethods(AsyncIterator.prototype),define(AsyncIterator.prototype,i,(function(){return this})),t.AsyncIterator=AsyncIterator,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new AsyncIterator(wrap(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},defineIteratorMethods(h),define(h,c,"Generator"),define(h,a,(function(){return this})),define(h,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function next(){for(;r.length;){var t=r.pop();if(t in e)return next.value=t,next.done=!1,next}return next.done=!0,next}},t.values=values,Context.prototype={constructor:Context,reset:function reset(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(resetTryEntry),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function stop(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function dispatchException(t){if(this.done)throw t;var e=this;function handle(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],a=o.completion;if("root"===o.tryLoc)return handle("end");if(o.tryLoc<=this.prev){var i=r.call(o,"catchLoc"),c=r.call(o,"finallyLoc");if(i&&c){if(this.prev<o.catchLoc)return handle(o.catchLoc,!0);if(this.prev<o.finallyLoc)return handle(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return handle(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return handle(o.finallyLoc)}}}},abrupt:function abrupt(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,u):this.complete(i)},complete:function complete(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),u},finish:function finish(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),resetTryEntry(r),u}},catch:function _catch(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;resetTryEntry(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function delegateYield(t,e,r){return this.delegate={iterator:values(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),u}},t}function asyncGeneratorStep(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function _asyncToGenerator(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function _next(t){asyncGeneratorStep(a,n,o,_next,_throw,"next",t)}function _throw(t){asyncGeneratorStep(a,n,o,_next,_throw,"throw",t)}_next(void 0)}))}}function __WEBPACK_DEFAULT_EXPORT__(t){return _ref.apply(this,arguments)}function _ref(){return _ref=_asyncToGenerator(_regeneratorRuntime().mark((function _callee4(t){var e,o,a,i;return _regeneratorRuntime().wrap((function _callee4$(c){for(;;)switch(c.prev=c.next){case 0:return e=t.playerbar,o=t.hlsjs,c.next=4,r.e(624).then(r.bind(r,624));case 4:a=c.sent,(0,a.triggerEvent)(n.default.initiated,t),o.on(Hls.Events.LEVEL_SWITCHED,function(){var e=_asyncToGenerator(_regeneratorRuntime().mark((function _callee(e,r){var n;return _regeneratorRuntime().wrap((function _callee$(e){for(;;)switch(e.prev=e.next){case 0:(o.currentLevel>0||"Auto"==(null===(n=t.querySelector("#quality-list.active"))||void 0===n?void 0:n.textContent))&&(t.querySelector(".quality-auto").textContent=o.levels.find((function(t,e){return e===o.currentLevel})).height);case 1:case"end":return e.stop()}}),_callee)})));return function(t,r){return e.apply(this,arguments)}}()),o.on(Hls.Events.BUFFER_CREATED,function(){var r=_asyncToGenerator(_regeneratorRuntime().mark((function _callee2(r,n){return _regeneratorRuntime().wrap((function _callee2$(r){for(;;)switch(r.prev=r.next){case 0:o.levels.length>1&&e.createQualityDropdown((function(){o.levels.forEach((function(e,r){t.querySelector("dropdown #quality-list").insertAdjacentHTML("beforeend",'<button data-id="'.concat(r,'">').concat(e.height,"</button>"))})),t.querySelector("dropdown #quality-list").insertAdjacentHTML("beforeend",'<button class="active" data-id="-1">Auto <span class="quality-auto">'.concat(o.levels[0].height,"</span></button>")),t.querySelectorAll("#quality-list button:not(.dropdown-back)").forEach((function(e,r){e.addEventListener("click",(function(r){var n=r.target;if(!e.classList.contains("active")){var a=n.dataset.id;t.querySelector("#quality-list button.active").classList.remove("active"),n.classList.add("active"),o.currentLevel=Number(a),Number(a)>0&&(t.querySelector(".quality-auto").textContent=o.levels.find((function(t,e){return e===Number(a)})).height)}}))}))}));case 1:case"end":return r.stop()}}),_callee2)})));return function(t,e){return r.apply(this,arguments)}}()),i=!1,o.on(Hls.Events.LEVEL_UPDATED,function(){var t=_asyncToGenerator(_regeneratorRuntime().mark((function _callee3(t,r){var n;return _regeneratorRuntime().wrap((function _callee3$(t){for(;;)switch(t.prev=t.next){case 0:i||(i=!0,n=r.details.live,e.initiate(!n));case 1:case"end":return t.stop()}}),_callee3)})));return function(e,r){return t.apply(this,arguments)}}());case 11:case"end":return c.stop()}}),_callee4)}))),_ref.apply(this,arguments)}}}]);