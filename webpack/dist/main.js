/*! For license information please see main.js.LICENSE.txt */
(()=>{var e,t,r={372:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var n=r(278);function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _regeneratorRuntime(){_regeneratorRuntime=function _regeneratorRuntime(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n=Object.defineProperty||function(e,t,r){e[t]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",o=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function define(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{define({},"")}catch(e){define=function define(e,t,r){return e[t]=r}}function wrap(e,t,r,i){var a=t&&t.prototype instanceof Generator?t:Generator,o=Object.create(a.prototype),c=new Context(i||[]);return n(o,"_invoke",{value:makeInvokeMethod(e,r,c)}),o}function tryCatch(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=wrap;var s={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var l={};define(l,a,(function(){return this}));var u=Object.getPrototypeOf,d=u&&u(u(values([])));d&&d!==t&&r.call(d,a)&&(l=d);var p=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(l);function defineIteratorMethods(e){["next","throw","return"].forEach((function(t){define(e,t,(function(e){return this._invoke(t,e)}))}))}function AsyncIterator(e,t){function invoke(n,i,a,o){var c=tryCatch(e[n],e,i);if("throw"!==c.type){var s=c.arg,l=s.value;return l&&"object"==_typeof(l)&&r.call(l,"__await")?t.resolve(l.__await).then((function(e){invoke("next",e,a,o)}),(function(e){invoke("throw",e,a,o)})):t.resolve(l).then((function(e){s.value=e,a(s)}),(function(e){return invoke("throw",e,a,o)}))}o(c.arg)}var i;n(this,"_invoke",{value:function value(e,r){function callInvokeWithMethodAndArg(){return new t((function(t,n){invoke(e,r,t,n)}))}return i=i?i.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}})}function makeInvokeMethod(e,t,r){var n="suspendedStart";return function(i,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===i)throw a;return doneResult()}for(r.method=i,r.arg=a;;){var o=r.delegate;if(o){var c=maybeInvokeDelegate(o,r);if(c){if(c===s)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var l=tryCatch(e,t,r);if("normal"===l.type){if(n=r.done?"completed":"suspendedYield",l.arg===s)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n="completed",r.method="throw",r.arg=l.arg)}}}function maybeInvokeDelegate(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,maybeInvokeDelegate(e,t),"throw"===t.method))return s;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var n=tryCatch(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,s;var i=n.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,s):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,s)}function pushTryEntry(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function resetTryEntry(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function Context(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(pushTryEntry,this),this.reset(!0)}function values(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,i=function next(){for(;++n<e.length;)if(r.call(e,n))return next.value=e[n],next.done=!1,next;return next.value=void 0,next.done=!0,next};return i.next=i}}return{next:doneResult}}function doneResult(){return{value:void 0,done:!0}}return GeneratorFunction.prototype=GeneratorFunctionPrototype,n(p,"constructor",{value:GeneratorFunctionPrototype,configurable:!0}),n(GeneratorFunctionPrototype,"constructor",{value:GeneratorFunction,configurable:!0}),GeneratorFunction.displayName=define(GeneratorFunctionPrototype,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===GeneratorFunction||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,GeneratorFunctionPrototype):(e.__proto__=GeneratorFunctionPrototype,define(e,c,"GeneratorFunction")),e.prototype=Object.create(p),e},e.awrap=function(e){return{__await:e}},defineIteratorMethods(AsyncIterator.prototype),define(AsyncIterator.prototype,o,(function(){return this})),e.AsyncIterator=AsyncIterator,e.async=function(t,r,n,i,a){void 0===a&&(a=Promise);var o=new AsyncIterator(wrap(t,r,n,i),a);return e.isGeneratorFunction(r)?o:o.next().then((function(e){return e.done?e.value:o.next()}))},defineIteratorMethods(p),define(p,c,"Generator"),define(p,a,(function(){return this})),define(p,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function next(){for(;r.length;){var e=r.pop();if(e in t)return next.value=e,next.done=!1,next}return next.done=!0,next}},e.values=values,Context.prototype={constructor:Context,reset:function reset(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(resetTryEntry),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function stop(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function dispatchException(e){if(this.done)throw e;var t=this;function handle(r,n){return a.type="throw",a.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],a=i.completion;if("root"===i.tryLoc)return handle("end");if(i.tryLoc<=this.prev){var o=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(o&&c){if(this.prev<i.catchLoc)return handle(i.catchLoc,!0);if(this.prev<i.finallyLoc)return handle(i.finallyLoc)}else if(o){if(this.prev<i.catchLoc)return handle(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return handle(i.finallyLoc)}}}},abrupt:function abrupt(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var a=i;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=e,o.arg=t,a?(this.method="next",this.next=a.finallyLoc,s):this.complete(o)},complete:function complete(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),s},finish:function finish(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),resetTryEntry(r),s}},catch:function _catch(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var i=n.arg;resetTryEntry(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function delegateYield(e,t,r){return this.delegate={iterator:values(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),s}},e}function asyncGeneratorStep(e,t,r,n,i,a,o){try{var c=e[a](o),s=c.value}catch(e){return void r(e)}c.done?t(s):Promise.resolve(s).then(n,i)}function _asyncToGenerator(e){return function(){var t=this,r=arguments;return new Promise((function(n,i){var a=e.apply(t,r);function _next(e){asyncGeneratorStep(a,n,i,_next,_throw,"next",e)}function _throw(e){asyncGeneratorStep(a,n,i,_next,_throw,"throw",e)}_next(void 0)}))}}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _possibleConstructorReturn(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(e)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _wrapNativeSuper(e){var t="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function _wrapNativeSuper(e){if(null===e||!function _isNativeFunction(e){return-1!==Function.toString.call(e).indexOf("[native code]")}(e))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,Wrapper)}function Wrapper(){return _construct(e,arguments,_getPrototypeOf(this).constructor)}return Wrapper.prototype=Object.create(e.prototype,{constructor:{value:Wrapper,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(Wrapper,e)},_wrapNativeSuper(e)}function _construct(e,t,r){return _construct=_isNativeReflectConstruct()?Reflect.construct.bind():function _construct(e,t,r){var n=[null];n.push.apply(n,t);var i=new(Function.bind.apply(e,n));return r&&_setPrototypeOf(i,r.prototype),i},_construct.apply(null,arguments)}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function _setPrototypeOf(e,t){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function _setPrototypeOf(e,t){return e.__proto__=t,e},_setPrototypeOf(e,t)}function _getPrototypeOf(e){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function _getPrototypeOf(e){return e.__proto__||Object.getPrototypeOf(e)},_getPrototypeOf(e)}function _classPrivateFieldInitSpec(e,t,r){!function _checkPrivateRedeclaration(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,r)}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _classPrivateFieldGet(e,t){return function _classApplyDescriptorGet(e,t){if(t.get)return t.get.call(e);return t.value}(e,_classExtractFieldDescriptor(e,t,"get"))}function _classPrivateFieldSet(e,t,r){return function _classApplyDescriptorSet(e,t,r){if(t.set)t.set.call(e,r);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=r}}(e,_classExtractFieldDescriptor(e,t,"set"),r),r}function _classExtractFieldDescriptor(e,t,r){if(!t.has(e))throw new TypeError("attempted to "+r+" private field on non-instance");return t.get(e)}var i=new WeakMap,a=new WeakMap,o=new WeakMap,c=function(e){!function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_setPrototypeOf(e,t)}(Player,e);var t,c,s,l=function _createSuper(e){var t=_isNativeReflectConstruct();return function _createSuperInternal(){var r,n=_getPrototypeOf(e);if(t){var i=_getPrototypeOf(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return _possibleConstructorReturn(this,r)}}(Player);function Player(){var e;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Player),_classPrivateFieldInitSpec(_assertThisInitialized(e=l.call(this)),i,{writable:!0,value:void 0}),_classPrivateFieldInitSpec(_assertThisInitialized(e),a,{writable:!0,value:null}),_defineProperty(_assertThisInitialized(e),"video",document.createElement("video")),_defineProperty(_assertThisInitialized(e),"playerbar",null),_defineProperty(_assertThisInitialized(e),"loader",null),_defineProperty(_assertThisInitialized(e),"overlayplay",document.createElement("overlayplay")),_defineProperty(_assertThisInitialized(e),"beforePlay",null),_defineProperty(_assertThisInitialized(e),"pictureInPicture",null),_classPrivateFieldInitSpec(_assertThisInitialized(e),o,{writable:!0,value:null}),_defineProperty(_assertThisInitialized(e),"pictureInPictureDisable",null),_classPrivateFieldSet(_assertThisInitialized(e),i,e.parentElement.videoManiaConfig),e.pictureInPictureDisable=_classPrivateFieldGet(_assertThisInitialized(e),i).disablePictureInPictureMode;var t="<style id='videomania-style'>\n      @layer base {\n        ".concat(_classPrivateFieldGet(_assertThisInitialized(e),i).selector," vm-player {\n          width: ").concat(_classPrivateFieldGet(_assertThisInitialized(e),i).width,"px;\n          height: ").concat(_classPrivateFieldGet(_assertThisInitialized(e),i).height,"px;\n        }\n      }\n    </style>");return document.head.insertAdjacentHTML("beforeend",t),e.overlayplay.innerHTML='<svg class="play-icon" style="enable-background: new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" > <path d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z" /> </svg> <svg class="pause-icon" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg" > <path d="M12,6H10A2,2,0,0,0,8,8V24a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2Z" /> <path d="M22,6H20a2,2,0,0,0-2,2V24a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2Z" /> <rect /> </svg>',e}return function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(Player,[{key:"togglePlayer",value:(s=_asyncToGenerator(_regeneratorRuntime().mark((function _callee(){var e,t,i=this;return _regeneratorRuntime().wrap((function _callee$(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,r.e(624).then(r.bind(r,624));case 2:e=o.sent,t=e.triggerEvent,_classPrivateFieldGet(this,a)&&clearTimeout(_classPrivateFieldGet(this,a)),this.classList.add("active"),t(n.default.playerActive,this),_classPrivateFieldSet(this,a,setTimeout((function(){i.classList.remove("active"),t(n.default.playerUnActive,i)}),5e3));case 8:case"end":return o.stop()}}),_callee,this)}))),function togglePlayer(){return s.apply(this,arguments)})},{key:"userTrigger",value:function userTrigger(e){_classPrivateFieldSet(this,o,e)}},{key:"qaulitiesList",value:function qaulitiesList(){return _classPrivateFieldGet(this,i).qualities}},{key:"subtitleList",value:function subtitleList(){return{list:_classPrivateFieldGet(this,i).subtitles,toggleSubtitle:_classPrivateFieldGet(this,i).toggleSubtitle}}},{key:"toggleSubtitle",value:function toggleSubtitle(e){_classPrivateFieldGet(this,i).toggleSubtitle=e}},{key:"initiatePlayer",value:(c=_asyncToGenerator(_regeneratorRuntime().mark((function _callee2(e){var t,n,a,o,c;return _regeneratorRuntime().wrap((function _callee2$(s){for(;;)switch(s.prev=s.next){case 0:if(e.preventDefault(),!_classPrivateFieldGet(this,i).controls){s.next=7;break}return s.next=4,r.e(631).then(r.bind(r,631));case 4:t=s.sent,customElements.define("vm-playerbar",t.default),this.insertAdjacentHTML("beforeend","<vm-playerbar />");case 7:if(this.video.autoplay=_classPrivateFieldGet(this,i).autoplay,this.video.muted=_classPrivateFieldGet(this,i).muted,this.video.width=_classPrivateFieldGet(this,i).width,this.video.height=_classPrivateFieldGet(this,i).height,this.video.loop=_classPrivateFieldGet(this,i).loop,this.video.pause(),this.append(this.video,this.overlayplay),n=_classPrivateFieldGet(this,i).rounded?"rounded":"",this.classList.add(n),!_classPrivateFieldGet(this,i).addStyle||document.querySelector("#videoMania-css")){s.next=26;break}return this.style.display="none",s.next=20,r.e(950).then(r.bind(r,950));case 20:a=s.sent,(o=document.createElement("style")).id="videoMania-css",o.innerHTML=a.default,document.head.append(o),this.style.display="block";case 26:c=this,window.addEventListener("focus",(function(){c.dataset.focus="true"}));case 28:case"end":return s.stop()}}),_callee2,this)}))),function initiatePlayer(e){return c.apply(this,arguments)})},{key:"checkIfVideoContainsAudio",value:function checkIfVideoContainsAudio(){return void 0!==this.video.webkitAudioDecodedByteCount?this.video.webkitAudioDecodedByteCount>0:void 0!==this.video.mozHasAudio&&this.video.mozHasAudio}},{key:"changePictureInPicture",value:function changePictureInPicture(e){this.pictureInPicture={width:e.width,height:e.height}}},{key:"connectedCallback",value:(t=_asyncToGenerator(_regeneratorRuntime().mark((function _callee8(){var e,t,a,c,s,l,u,d,p,f,v,h,y,_=this;return _regeneratorRuntime().wrap((function _callee8$(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,r.e(624).then(r.bind(r,624));case 2:return e=g.sent,t=e.retrieveFormat,a=e.replayIconBtn,c=t(_classPrivateFieldGet(this,i).url),g.next=8,r.e(791).then(r.bind(r,791));case 8:return s=g.sent,l=s.dynamicFormats,g.next=12,r.e(624).then(r.bind(r,624));case 12:if(u=g.sent,d=u.triggerEvent,this.tabIndex=1,this.addEventListener("mouseenter",this.togglePlayer),this.addEventListener("mousemove",this.togglePlayer),this.addEventListener(n.default.playerReady,this.initiatePlayer),this.addEventListener(n.default.beforePlay,(function(e){e.preventDefault();try{"true"==p.dataset.focus&&_.video.paused&&_.video.play(),_.dataset.toggle="played",_.overlayplay.classList.add("active"),setTimeout((function(){_.overlayplay.classList.remove("active")}),200)}catch(e){console.log(e)}})),this.beforePlay=function(e){return _.addEventListener(n.default.beforePlay,e,!0)},this.addEventListener(n.default.pause,(function(e){e.preventDefault(),_.dataset.toggle="paused",_.video.pause(),_.overlayplay.classList.add("active"),setTimeout((function(){_.overlayplay.classList.remove("active")}),200)})),this.addEventListener(n.default.playPause,(function(e){e.preventDefault();var t=_.video.paused?n.default.play:n.default.pause;d(t,_)})),this.addEventListener(n.default.end,(function(e){e.preventDefault(),_.dataset.toggle="paused",_.video.currentTime=0,_.video.pause(),a(_),d(n.default.loaded,_)})),this.addEventListener(n.default.forward,function(){var e=_asyncToGenerator(_regeneratorRuntime().mark((function _callee3(e){var t,n,a;return _regeneratorRuntime().wrap((function _callee3$(o){for(;;)switch(o.prev=o.next){case 0:return e.preventDefault(),_.video.currentTime=_.video.currentTime+_classPrivateFieldGet(_,i).forward,o.next=4,r.e(666).then(r.bind(r,666));case 4:t=o.sent,n=t.forwardIcon,(a=_.overlayplay.cloneNode()).innerHTML=n,_.append(a),a.classList.add("active"),setTimeout((function(){a.classList.remove("active"),setTimeout((function(){a.remove()}),200)}),200);case 11:case"end":return o.stop()}}),_callee3)})));return function(t){return e.apply(this,arguments)}}()),this.addEventListener(n.default.backward,function(){var e=_asyncToGenerator(_regeneratorRuntime().mark((function _callee4(e){var t,n,a;return _regeneratorRuntime().wrap((function _callee4$(o){for(;;)switch(o.prev=o.next){case 0:return e.preventDefault(),_.video.currentTime=_.video.currentTime-_classPrivateFieldGet(_,i).backward,o.next=4,r.e(666).then(r.bind(r,666));case 4:t=o.sent,n=t.rewindIcon,(a=_.overlayplay.cloneNode()).innerHTML=n,_.append(a),a.classList.add("active"),setTimeout((function(){a.classList.remove("active"),setTimeout((function(){a.remove()}),200)}),200);case 11:case"end":return o.stop()}}),_callee4)})));return function(t){return e.apply(this,arguments)}}()),this.addEventListener(n.default.fullscreen,(function(e){e.preventDefault(),_.requestFullscreen()})),this.addEventListener(n.default.exitFullscreen,(function(e){e.preventDefault(),document.exitFullscreen()})),this.addEventListener(n.default.toggleFullScreen,(function(e){e.preventDefault();var t=document.fullscreenElement?"exitFullscreen":"fullscreen";d(t,_)})),this.addEventListener(n.default.mute,(function(e){e.preventDefault(),_.video.muted=!0})),this.addEventListener(n.default.unmute,(function(e){e.preventDefault(),_.video.muted=!1})),this.addEventListener(n.default.toggleMute,(function(e){e.preventDefault();var t=_.video.muted?"unmute":"mute";d(t,_)})),this.addEventListener(n.default.loading,_asyncToGenerator(_regeneratorRuntime().mark((function _callee5(){var e,t,n;return _regeneratorRuntime().wrap((function _callee5$(i){for(;;)switch(i.prev=i.next){case 0:if(this.loader&&this.querySelector("#videoManiaLoader")){i.next=10;break}return e=document.createElement("loader"),this.loader=e,i.next=5,r.e(666).then(r.bind(r,666));case 5:t=i.sent,n=t.loaderAnimatedIcon,e.innerHTML=n,e.id="videoManiaLoader",this.append(this.loader);case 10:case"end":return i.stop()}}),_callee5,this)})))),this.addEventListener(n.default.loaded,_asyncToGenerator(_regeneratorRuntime().mark((function _callee6(){return _regeneratorRuntime().wrap((function _callee6$(e){for(;;)switch(e.prev=e.next){case 0:this.loader&&this.querySelector("#videoManiaLoader")&&(this.querySelector("#"+this.loader.id).remove(),this.loader=null);case 1:case"end":return e.stop()}}),_callee6,this)})))),p=this,this.video.addEventListener("ended",(function(){d(n.default.end,p)})),this.addEventListener("keydown",function(){var e=_asyncToGenerator(_regeneratorRuntime().mark((function _callee7(e){return _regeneratorRuntime().wrap((function _callee7$(t){for(;;)switch(t.prev=t.next){case 0:e.preventDefault(),Object.keys(n.keyTriggerEvent).includes(e.key)&&(d(n.keyTriggerEvent[e.key],_),["play","pause"].includes(n.keyTriggerEvent[e.key])&&_classPrivateFieldSet(_,o,[n.keyTriggerEvent[e.key]]));case 3:case"end":return t.stop()}}),_callee7)})));return function(t){return e.apply(this,arguments)}}()),this.overlayplay.addEventListener("click",(function(){p.userTrigger(p.video.paused?"play":"pause"),d(n.default.playPause,p)})),this.video.addEventListener("volumechange",(function(){d(n.default.volumechange,p)})),!l.includes(c)){g.next=60;break}return g.next=41,r.e(791).then(r.bind(r,791));case 41:if(f=g.sent,v=f.default(this,_classPrivateFieldGet(this,i).url)[c],document.querySelector("script#videomania-".concat(c))){g.next=52;break}return g.next=46,r.e(624).then(r.bind(r,624));case 46:h=g.sent,(0,h.addScript)(v.url,c).onload=v.init,g.next=53;break;case 52:v.init(this);case 53:return g.next=55,r.e(624).then(r.bind(r,624));case 55:(0,g.sent.triggerEvent)("playerReady",this),g.next=64;break;case 60:return g.next=62,r.e(76).then(r.bind(r,76));case 62:(y=g.sent).supportedVideoFormat.includes(c)&&(y.default(this),d("playerReady",this),this.video.src=_classPrivateFieldGet(this,i).url);case 64:document.pictureInPictureEnabled&&(this.video.addEventListener("enterpictureinpicture",(function(){d(n.default.pictureInPicture,p)})),this.video.addEventListener("leavepictureinpicture",(function(){d(n.default.exitPictureInPicture,p),p.pictureInPicture=!1}))),this.addEventListener(n.default.initiated,(function(){var e=this;this.addEventListener(n.default.play,(function(){d(n.default.beforePlay,e)})),navigator.mediaDevices.getUserMedia({video:!1,audio:!0}).then((function(e){window.localStream=e,p.video.autoplay&&p.video.play()})).catch((function(e){console.error("you got an error: ".concat(e))}));var t="visible"===document.visibilityState&&_classPrivateFieldGet(this,i).autoplay;this.dataset.toggle=t?"played":"paused"})),document.addEventListener("visibilitychange",(function(e){var t="pause"!==_classPrivateFieldGet(p,o);document.hidden?d(n.default.pause,p):t&&d(n.default.play,p)})),window.addEventListener("load",(function(){"pause"!==_classPrivateFieldGet(p,o)&&d(n.default.play,p)}));case 68:case"end":return g.stop()}}),_callee8,this)}))),function connectedCallback(){return t.apply(this,arguments)})}]),Player}(_wrapNativeSuper(HTMLElement));_defineProperty(c,"unactivePlayer",void 0)},278:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a,keyTriggerEvent:()=>i});var n={playerReady:"playerReady",playPause:"playPause",play:"play",pause:"pause",end:"end",forward:"forward",backward:"backward",toggleFullScreen:"toggleFullScreen",fullscreen:"fullscreen",exitFullscreen:"exitFullscreen",toggleMute:"toggleMute",mute:"mute",unmute:"unmute",live:"live",playable:"playable",loading:"loading",loaded:"loaded",beforePlay:"beforePlay",initiated:"initiated",volumechange:"volumechange",pictureInPicture:"pictureInPicture",exitPictureInPicture:"exitPictureInPicture",resizePictureInPicture:"resizePictureInPicture",toggleSubtitle:"toggleSubtitle",showSubtitle:"showSubtitle",hideSubtitle:"hideSubtitle",playerActive:"playerActive",playerUnActive:"playerUnActive",dynamicDashJs:"dynamicDashJs",dynamicHlsJs:"dynamicHlsJs"},i={" ":n.playPause,ArrowLeft:n.backward,ArrowRight:n.forward,m:n.toggleMute,f:n.toggleFullScreen,t:n.toggleSubtitle};const a=n}},n={};function __webpack_require__(e){var t=n[e];if(void 0!==t)return t.exports;var i=n[e]={id:e,exports:{}};return r[e](i,i.exports,__webpack_require__),i.exports}__webpack_require__.m=r,__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(t,{a:t}),t},__webpack_require__.d=(e,t)=>{for(var r in t)__webpack_require__.o(t,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},__webpack_require__.f={},__webpack_require__.e=e=>Promise.all(Object.keys(__webpack_require__.f).reduce(((t,r)=>(__webpack_require__.f[r](e,t),t)),[])),__webpack_require__.u=e=>e+".js",__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="my-webpack-project:",__webpack_require__.l=(r,n,i,a)=>{if(e[r])e[r].push(n);else{var o,c;if(void 0!==i)for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){var u=s[l];if(u.getAttribute("src")==r||u.getAttribute("data-webpack")==t+i){o=u;break}}o||(c=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,__webpack_require__.nc&&o.setAttribute("nonce",__webpack_require__.nc),o.setAttribute("data-webpack",t+i),o.src=r),e[r]=[n];var onScriptComplete=(t,n)=>{o.onerror=o.onload=null,clearTimeout(d);var i=e[r];if(delete e[r],o.parentNode&&o.parentNode.removeChild(o),i&&i.forEach((e=>e(n))),t)return t(n)},d=setTimeout(onScriptComplete.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=onScriptComplete.bind(null,o.onerror),o.onload=onScriptComplete.bind(null,o.onload),c&&document.head.appendChild(o)}},__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var t=__webpack_require__.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),(()=>{var e={179:0};__webpack_require__.f.j=(t,r)=>{var n=__webpack_require__.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var i=new Promise(((r,i)=>n=e[t]=[r,i]));r.push(n[2]=i);var a=__webpack_require__.p+__webpack_require__.u(t),o=new Error;__webpack_require__.l(a,(r=>{if(__webpack_require__.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;o.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",o.name="ChunkLoadError",o.type=i,o.request=a,n[1](o)}}),"chunk-"+t,t)}};var webpackJsonpCallback=(t,r)=>{var n,i,[a,o,c]=r,s=0;if(a.some((t=>0!==e[t]))){for(n in o)__webpack_require__.o(o,n)&&(__webpack_require__.m[n]=o[n]);if(c)c(__webpack_require__)}for(t&&t(r);s<a.length;s++)i=a[s],__webpack_require__.o(e,i)&&e[i]&&e[i][0](),e[i]=0},t=self.webpackChunkmy_webpack_project=self.webpackChunkmy_webpack_project||[];t.forEach(webpackJsonpCallback.bind(null,0)),t.push=webpackJsonpCallback.bind(null,t.push.bind(t))})(),__webpack_require__.nc=void 0,(()=>{function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){_defineProperty(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var e=__webpack_require__(372),t=["mp4","webm","ogg","m3u8","mpd"];window.videoMania=function videoMania(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"beforeend",i=document.querySelector(null==r?void 0:r.selector);if(i){var a=r.url.split("."),o=a[a.length-1];if(customElements.get("vm-player")||customElements.define("vm-player",e.default),t.includes(o)){var c=_objectSpread({width:800,height:450,autoplay:!1,muted:!1,loop:!1,url:null,id:null,qualities:[],subtitles:[],toggleSubtitle:!1,forward:10,backward:10,controls:!0,rounded:!0,addStyle:!0,disablePictureInPictureMode:!1},r);i.videoManiaConfig=c,i.insertAdjacentHTML(n,'<vm-player data-selector="'.concat(c.selector,'" />'));var s=i.querySelector("vm-player");return s}throw i.insertAdjacentHTML("beforeend",'<div class="player-error" style="width: '.concat(setting.width,"px; height: ").concat(setting.height,'px"><?xml version="1.0" ?><svg id="Layer_1" style="enable-background:new 0 0 612 792;" version="1.1" viewBox="0 0 612 792" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon class="st0" points="382.2,396.4 560.8,217.8 484,141 305.4,319.6 126.8,141 50,217.8 228.6,396.4 50,575 126.8,651.8    305.4,473.2 484,651.8 560.8,575 382.2,396.4  "/></g></svg><p>Incorrect <strong>{video url}</strong></p></div>')),new Error("Incorrect {video url}")}var l=setting.selector?"Could not find element {".concat(setting.selector,"}"):"Please add selector {selector: (class or id)}";throw new Error(l)}})()})();