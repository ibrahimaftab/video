/*! For license information please see 624.js.LICENSE.txt */
"use strict";(self.webpackChunkmy_webpack_project=self.webpackChunkmy_webpack_project||[]).push([[624],{624:(e,t,n)=>{function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _regeneratorRuntime(){_regeneratorRuntime=function _regeneratorRuntime(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,r=Object.defineProperty||function(e,t,n){e[t]=n.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function define(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{define({},"")}catch(e){define=function define(e,t,n){return e[t]=n}}function wrap(e,t,n,o){var i=t&&t.prototype instanceof Generator?t:Generator,a=Object.create(i.prototype),c=new Context(o||[]);return r(a,"_invoke",{value:makeInvokeMethod(e,n,c)}),a}function tryCatch(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=wrap;var u={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var l={};define(l,i,(function(){return this}));var s=Object.getPrototypeOf,d=s&&s(s(values([])));d&&d!==t&&n.call(d,i)&&(l=d);var f=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(l);function defineIteratorMethods(e){["next","throw","return"].forEach((function(t){define(e,t,(function(e){return this._invoke(t,e)}))}))}function AsyncIterator(e,t){function invoke(r,o,i,a){var c=tryCatch(e[r],e,o);if("throw"!==c.type){var u=c.arg,l=u.value;return l&&"object"==_typeof(l)&&n.call(l,"__await")?t.resolve(l.__await).then((function(e){invoke("next",e,i,a)}),(function(e){invoke("throw",e,i,a)})):t.resolve(l).then((function(e){u.value=e,i(u)}),(function(e){return invoke("throw",e,i,a)}))}a(c.arg)}var o;r(this,"_invoke",{value:function value(e,n){function callInvokeWithMethodAndArg(){return new t((function(t,r){invoke(e,n,t,r)}))}return o=o?o.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}})}function makeInvokeMethod(e,t,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return doneResult()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=maybeInvokeDelegate(a,n);if(c){if(c===u)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var l=tryCatch(e,t,n);if("normal"===l.type){if(r=n.done?"completed":"suspendedYield",l.arg===u)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(r="completed",n.method="throw",n.arg=l.arg)}}}function maybeInvokeDelegate(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,maybeInvokeDelegate(e,t),"throw"===t.method))return u;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return u}var r=tryCatch(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,u;var o=r.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,u):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,u)}function pushTryEntry(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function resetTryEntry(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function Context(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(pushTryEntry,this),this.reset(!0)}function values(e){if(e){var t=e[i];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,o=function next(){for(;++r<e.length;)if(n.call(e,r))return next.value=e[r],next.done=!1,next;return next.value=void 0,next.done=!0,next};return o.next=o}}return{next:doneResult}}function doneResult(){return{value:void 0,done:!0}}return GeneratorFunction.prototype=GeneratorFunctionPrototype,r(f,"constructor",{value:GeneratorFunctionPrototype,configurable:!0}),r(GeneratorFunctionPrototype,"constructor",{value:GeneratorFunction,configurable:!0}),GeneratorFunction.displayName=define(GeneratorFunctionPrototype,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===GeneratorFunction||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,GeneratorFunctionPrototype):(e.__proto__=GeneratorFunctionPrototype,define(e,c,"GeneratorFunction")),e.prototype=Object.create(f),e},e.awrap=function(e){return{__await:e}},defineIteratorMethods(AsyncIterator.prototype),define(AsyncIterator.prototype,a,(function(){return this})),e.AsyncIterator=AsyncIterator,e.async=function(t,n,r,o,i){void 0===i&&(i=Promise);var a=new AsyncIterator(wrap(t,n,r,o),i);return e.isGeneratorFunction(n)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},defineIteratorMethods(f),define(f,c,"Generator"),define(f,i,(function(){return this})),define(f,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function next(){for(;n.length;){var e=n.pop();if(e in t)return next.value=e,next.done=!1,next}return next.done=!0,next}},e.values=values,Context.prototype={constructor:Context,reset:function reset(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(resetTryEntry),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function stop(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function dispatchException(e){if(this.done)throw e;var t=this;function handle(n,r){return i.type="throw",i.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],i=o.completion;if("root"===o.tryLoc)return handle("end");if(o.tryLoc<=this.prev){var a=n.call(o,"catchLoc"),c=n.call(o,"finallyLoc");if(a&&c){if(this.prev<o.catchLoc)return handle(o.catchLoc,!0);if(this.prev<o.finallyLoc)return handle(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return handle(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return handle(o.finallyLoc)}}}},abrupt:function abrupt(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,u):this.complete(a)},complete:function complete(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),u},finish:function finish(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),resetTryEntry(n),u}},catch:function _catch(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;resetTryEntry(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function delegateYield(e,t,n){return this.delegate={iterator:values(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),u}},e}function asyncGeneratorStep(e,t,n,r,o,i,a){try{var c=e[i](a),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(r,o)}function _asyncToGenerator(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function _next(e){asyncGeneratorStep(i,r,o,_next,_throw,"next",e)}function _throw(e){asyncGeneratorStep(i,r,o,_next,_throw,"throw",e)}_next(void 0)}))}}function addScript(e,t){var n=document.createElement("script");return n.src=e,n.id="videomania-".concat(t),document.body.append(n),n}function qualityListHeight(e){var t=document.querySelector("".concat(e," dropdown")),n=getComputedStyle(t),r=n.paddingTop,o=n.paddingBottom,i=document.querySelector("".concat(e," #quality-list")).offsetHeight,a="@layer settings {".concat(e," dropdown.show-quality{height: ").concat(i+parseInt(r)+parseInt(o),"px}}");document.querySelector("#videomania-style").insertAdjacentHTML("beforeend",a)}function forwardRewindIcon(e,t){return _forwardRewindIcon.apply(this,arguments)}function _forwardRewindIcon(){return(_forwardRewindIcon=_asyncToGenerator(_regeneratorRuntime().mark((function _callee(e,t){var r,o,i,a;return _regeneratorRuntime().wrap((function _callee$(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,n.e(666).then(n.bind(n,666));case 2:r=c.sent,o=r.rewindIcon,i=r.forwardIcon,"ArrowLeft"!==t&&"ArrowRight"!==t||((a=document.createElement("forward-rewind")).innerHTML="ArrowLeft"===t?o:i,a.id="forward-rewind",e.append(a),setTimeout((function(){e.querySelector("#forward-rewind").remove()}),300));case 6:case"end":return c.stop()}}),_callee)})))).apply(this,arguments)}function volumeIcon(e,t){return _volumeIcon.apply(this,arguments)}function _volumeIcon(){return(_volumeIcon=_asyncToGenerator(_regeneratorRuntime().mark((function _callee2(e,t){var r,o,i,a,c;return _regeneratorRuntime().wrap((function _callee2$(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,n.e(666).then(n.bind(n,666));case 2:r=u.sent,o=r.muteIcon,i=r.audioIcon,"m"===t&&(a=document.createElement("forward-rewind"),c=e.querySelector("video"),a.innerHTML=c.muted?o:i,a.id="volume-change",e.append(a),setTimeout((function(){e.querySelector("#volume-change").remove()}),300));case 6:case"end":return u.stop()}}),_callee2)})))).apply(this,arguments)}function replayIconBtn(e){return _replayIconBtn.apply(this,arguments)}function _replayIconBtn(){return(_replayIconBtn=_asyncToGenerator(_regeneratorRuntime().mark((function _callee3(e){var t,r,o,i;return _regeneratorRuntime().wrap((function _callee3$(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.e(666).then(n.bind(n,666));case 2:t=a.sent,r=t.replayIcon,o=document.createElement("replay"),i=e.video,o.innerHTML=r,e.append(o),o.addEventListener("click",(function(t){t.preventDefault(),o.remove(),i.play(),e.dataset.toggle="played"}));case 9:case"end":return a.stop()}}),_callee3)})))).apply(this,arguments)}n.r(t),n.d(t,{addScript:()=>addScript,checkVideoBuffer:()=>checkVideoBuffer,forwardRewindIcon:()=>forwardRewindIcon,initialObj:()=>r,onCueChange:()=>onCueChange,qualityListHeight:()=>qualityListHeight,replayIconBtn:()=>replayIconBtn,retrieveFormat:()=>i,setDropdownSettingHeight:()=>setDropdownSettingHeight,triggerEvent:()=>a,videoDurationFormat:()=>videoDurationFormat,videoManiaInitEvent:()=>o,videoManiaLive:()=>videoManiaLive,volumeIcon:()=>volumeIcon});var r={selector:null,width:800,height:450,autoplay:!1,muted:!1,loop:!1,url:null,id:null,qualities:[],subtitles:[],toggleSubtitle:!1,forward:10,backward:10},o=new Event("videoManiaInit");function videoManiaLive(e){return _videoManiaLive.apply(this,arguments)}function _videoManiaLive(){return(_videoManiaLive=_asyncToGenerator(_regeneratorRuntime().mark((function _callee4(e){var t,r,o;return _regeneratorRuntime().wrap((function _callee4$(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,n.e(666).then(n.bind(n,666));case 2:t=i.sent,r=t.liveIcon,(o=document.createElement("live")).innerHTML=r,o.append("Live"),e.querySelector("timeline").remove(),e.querySelector("play").after(o);case 9:case"end":return i.stop()}}),_callee4)})))).apply(this,arguments)}function videoDurationFormat(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(e.duration){var n=new Date(null),r=t?e.duration-e.currentTime:e.duration;if(r!=1/0){n.setSeconds(r);var o=null==n?void 0:n.toISOString().substr(11,8);if(o&&"00"!=(null==o?void 0:o.split(":")[0]))return(t?"-":"")+o;var i=o.split(":");return"".concat(t?"-":"").concat(i[1],":").concat(i[2])}}}function setDropdownSettingHeight(e){var t=e.setting.querySelector("#setting-dropdown"),n=e.dropdown,r=e.parentElement,o=t.offsetHeight,i=getComputedStyle(n),a=i.paddingTop,c=i.paddingBottom,u=o+parseInt(a)+parseInt(c),l="@layer settings ".concat(r.dataset.selector," dropdown{height: ").concat(u,"px}}");document.querySelector("#videomania-style").insertAdjacentHTML("beforeend",l)}function onCueChange(e,t){for(var n=0;n<e.target.textTracks.length;n++){e.target.textTracks[n].mode=t?"showing":"hidden";for(var r=0;r<e.target.textTracks[n].cues.length;r++)e.target.textTracks[n].cues[r].line=-2.5}}function checkVideoBuffer(e){return _checkVideoBuffer.apply(this,arguments)}function _checkVideoBuffer(){return(_checkVideoBuffer=_asyncToGenerator(_regeneratorRuntime().mark((function _callee5(e){var t,r,o,i,c,u,l;return _regeneratorRuntime().wrap((function _callee5$(s){for(;;)switch(s.prev=s.next){case 0:return l=function _checkBuffering(){o=u.currentTime;var n=(t-20)/1e3;!i&&o<r+n&&!u.paused&&u.playable>=1&&(i=!0),i&&o>r+n&&!u.paused&&(i=!1),r=o;var l=i?c.default.loading:c.default.loaded;a(l,e)},t=50,r=0,o=0,i=!1,s.next=7,Promise.resolve().then(n.bind(n,278));case 7:c=s.sent,u=e.video,setInterval(l,t);case 10:case"end":return s.stop()}}),_callee5)})))).apply(this,arguments)}var i=function retrieveFormat(e){return e.split(".")[e.split(".").length-1].toLowerCase()},a=function triggerEvent(e,t){return t.dispatchEvent(new Event(e))}}}]);