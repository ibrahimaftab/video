"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmy_webpack_project"] = self["webpackChunkmy_webpack_project"] || []).push([["src_utils_js"],{

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addScript\": () => (/* binding */ addScript),\n/* harmony export */   \"checkVideoBuffer\": () => (/* binding */ checkVideoBuffer),\n/* harmony export */   \"forwardRewindIcon\": () => (/* binding */ forwardRewindIcon),\n/* harmony export */   \"initialObj\": () => (/* binding */ initialObj),\n/* harmony export */   \"onCueChange\": () => (/* binding */ onCueChange),\n/* harmony export */   \"qualityListHeight\": () => (/* binding */ qualityListHeight),\n/* harmony export */   \"replayIconBtn\": () => (/* binding */ replayIconBtn),\n/* harmony export */   \"retrieveFormat\": () => (/* binding */ retrieveFormat),\n/* harmony export */   \"setDropdownSettingHeight\": () => (/* binding */ setDropdownSettingHeight),\n/* harmony export */   \"triggerEvent\": () => (/* binding */ triggerEvent),\n/* harmony export */   \"videoDurationFormat\": () => (/* binding */ videoDurationFormat),\n/* harmony export */   \"videoManiaInitEvent\": () => (/* binding */ videoManiaInitEvent),\n/* harmony export */   \"videoManiaLive\": () => (/* binding */ videoManiaLive),\n/* harmony export */   \"volumeIcon\": () => (/* binding */ volumeIcon)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = \"function\" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || \"@@iterator\", asyncIteratorSymbol = $Symbol.asyncIterator || \"@@asyncIterator\", toStringTagSymbol = $Symbol.toStringTag || \"@@toStringTag\"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, \"\"); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, \"_invoke\", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: \"normal\", arg: fn.call(obj, arg) }; } catch (err) { return { type: \"throw\", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { [\"next\", \"throw\", \"return\"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if (\"throw\" !== record.type) { var result = record.arg, value = result.value; return value && \"object\" == _typeof(value) && hasOwn.call(value, \"__await\") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke(\"next\", value, resolve, reject); }, function (err) { invoke(\"throw\", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke(\"throw\", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, \"_invoke\", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = \"suspendedStart\"; return function (method, arg) { if (\"executing\" === state) throw new Error(\"Generator is already running\"); if (\"completed\" === state) { if (\"throw\" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if (\"next\" === context.method) context.sent = context._sent = context.arg;else if (\"throw\" === context.method) { if (\"suspendedStart\" === state) throw state = \"completed\", context.arg; context.dispatchException(context.arg); } else \"return\" === context.method && context.abrupt(\"return\", context.arg); state = \"executing\"; var record = tryCatch(innerFn, self, context); if (\"normal\" === record.type) { if (state = context.done ? \"completed\" : \"suspendedYield\", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } \"throw\" === record.type && (state = \"completed\", context.method = \"throw\", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, \"throw\" === context.method) { if (delegate.iterator[\"return\"] && (context.method = \"return\", context.arg = undefined, maybeInvokeDelegate(delegate, context), \"throw\" === context.method)) return ContinueSentinel; context.method = \"throw\", context.arg = new TypeError(\"The iterator does not provide a 'throw' method\"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if (\"throw\" === record.type) return context.method = \"throw\", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, \"return\" !== context.method && (context.method = \"next\", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = \"throw\", context.arg = new TypeError(\"iterator result is not an object\"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = \"normal\", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: \"root\" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if (\"function\" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, \"GeneratorFunction\"), exports.isGeneratorFunction = function (genFun) { var ctor = \"function\" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || \"GeneratorFunction\" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, \"GeneratorFunction\")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, \"Generator\"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, \"toString\", function () { return \"[object Generator]\"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { \"t\" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if (\"throw\" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = \"throw\", record.arg = exception, context.next = loc, caught && (context.method = \"next\", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if (\"root\" === entry.tryLoc) return handle(\"end\"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, \"catchLoc\"), hasFinally = hasOwn.call(entry, \"finallyLoc\"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error(\"try statement without catch or finally\"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, \"finallyLoc\") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && (\"break\" === type || \"continue\" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = \"next\", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if (\"throw\" === record.type) throw record.arg; return \"break\" === record.type || \"continue\" === record.type ? this.next = record.arg : \"return\" === record.type ? (this.rval = this.arg = record.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, \"catch\": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if (\"throw\" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, \"next\" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\nfunction addScript(url, id) {\n  var script = document.createElement(\"script\");\n  script.src = url;\n  script.id = \"videomania-\".concat(id);\n  document.body.append(script);\n  return script;\n}\nfunction qualityListHeight(selector) {\n  var selectorElement = document.querySelector(\"\".concat(selector, \" dropdown\"));\n  var selectorComputed = getComputedStyle(selectorElement);\n  var paddingTop = selectorComputed.paddingTop,\n    paddingBottom = selectorComputed.paddingBottom;\n  var _document$querySelect = document.querySelector(\"\".concat(selector, \" #quality-list\")),\n    offsetHeight = _document$querySelect.offsetHeight;\n  var style = \"@layer settings {\".concat(selector, \" dropdown.show-quality{height: \").concat(offsetHeight + parseInt(paddingTop) + parseInt(paddingBottom), \"px}}\");\n  document.querySelector(\"#videomania-style\").insertAdjacentHTML(\"beforeend\", style);\n}\nfunction forwardRewindIcon(_x, _x2) {\n  return _forwardRewindIcon.apply(this, arguments);\n}\nfunction _forwardRewindIcon() {\n  _forwardRewindIcon = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(player, key) {\n    var _yield$import, rewindIcon, forwardIcon, forwardRewind;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return __webpack_require__.e(/*! import() */ \"src_icons_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./icons.js */ \"./src/icons.js\"));\n          case 2:\n            _yield$import = _context.sent;\n            rewindIcon = _yield$import.rewindIcon;\n            forwardIcon = _yield$import.forwardIcon;\n            if (key === \"ArrowLeft\" || key === \"ArrowRight\") {\n              forwardRewind = document.createElement(\"forward-rewind\");\n              forwardRewind.innerHTML = key === \"ArrowLeft\" ? rewindIcon : forwardIcon;\n              forwardRewind.id = \"forward-rewind\";\n              player.append(forwardRewind);\n              setTimeout(function () {\n                player.querySelector(\"#forward-rewind\").remove();\n              }, 300);\n            }\n          case 6:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _forwardRewindIcon.apply(this, arguments);\n}\nfunction volumeIcon(_x3, _x4) {\n  return _volumeIcon.apply(this, arguments);\n}\nfunction _volumeIcon() {\n  _volumeIcon = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(player, key) {\n    var _yield$import2, muteIcon, audioIcon, forwardRewind, video;\n    return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _context2.next = 2;\n            return __webpack_require__.e(/*! import() */ \"src_icons_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./icons.js */ \"./src/icons.js\"));\n          case 2:\n            _yield$import2 = _context2.sent;\n            muteIcon = _yield$import2.muteIcon;\n            audioIcon = _yield$import2.audioIcon;\n            if (key === \"m\") {\n              forwardRewind = document.createElement(\"forward-rewind\");\n              video = player.querySelector(\"video\");\n              forwardRewind.innerHTML = video.muted ? muteIcon : audioIcon;\n              forwardRewind.id = \"volume-change\";\n              player.append(forwardRewind);\n              setTimeout(function () {\n                player.querySelector(\"#volume-change\").remove();\n              }, 300);\n            }\n          case 6:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  }));\n  return _volumeIcon.apply(this, arguments);\n}\nfunction replayIconBtn(_x5) {\n  return _replayIconBtn.apply(this, arguments);\n}\nfunction _replayIconBtn() {\n  _replayIconBtn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(player) {\n    var _yield$import3, replayIcon, replay, video;\n    return _regeneratorRuntime().wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            _context3.next = 2;\n            return __webpack_require__.e(/*! import() */ \"src_icons_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./icons.js */ \"./src/icons.js\"));\n          case 2:\n            _yield$import3 = _context3.sent;\n            replayIcon = _yield$import3.replayIcon;\n            replay = document.createElement(\"replay\");\n            video = player.video;\n            replay.innerHTML = replayIcon;\n            player.append(replay);\n            replay.addEventListener(\"click\", function (e) {\n              4;\n              e.preventDefault();\n              replay.remove();\n              video.play();\n              player.dataset.toggle = 'played';\n            });\n          case 9:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3);\n  }));\n  return _replayIconBtn.apply(this, arguments);\n}\nvar initialObj = {\n  selector: null,\n  width: 800,\n  height: 450,\n  autoplay: false,\n  muted: false,\n  loop: false,\n  url: null,\n  id: null,\n  qualities: [],\n  subtitles: [],\n  toggleSubtitle: false,\n  forward: 10,\n  backward: 10\n};\nvar videoManiaInitEvent = new Event(\"videoManiaInit\");\nfunction videoManiaLive(_x6) {\n  return _videoManiaLive.apply(this, arguments);\n}\nfunction _videoManiaLive() {\n  _videoManiaLive = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(selector) {\n    var _yield$import4, liveIcon, live;\n    return _regeneratorRuntime().wrap(function _callee4$(_context4) {\n      while (1) {\n        switch (_context4.prev = _context4.next) {\n          case 0:\n            _context4.next = 2;\n            return __webpack_require__.e(/*! import() */ \"src_icons_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./icons.js */ \"./src/icons.js\"));\n          case 2:\n            _yield$import4 = _context4.sent;\n            liveIcon = _yield$import4.liveIcon;\n            live = document.createElement(\"live\");\n            live.innerHTML = liveIcon;\n            live.append(\"Live\");\n            selector.querySelector(\"timeline\").remove();\n            selector.querySelector(\"play\").after(live);\n          case 9:\n          case \"end\":\n            return _context4.stop();\n        }\n      }\n    }, _callee4);\n  }));\n  return _videoManiaLive.apply(this, arguments);\n}\nfunction videoDurationFormat(video) {\n  var subtract = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  if (video.duration) {\n    var date = new Date(null);\n    var seconds = subtract ? video.duration - video.currentTime : video.duration;\n    if (seconds != Infinity) {\n      date.setSeconds(seconds);\n      var formatDuration = date === null || date === void 0 ? void 0 : date.toISOString().substr(11, 8);\n      if (formatDuration && (formatDuration === null || formatDuration === void 0 ? void 0 : formatDuration.split(\":\")[0]) != \"00\") {\n        return (subtract ? \"-\" : \"\") + formatDuration;\n      }\n      var splitHMS = formatDuration.split(\":\");\n      return \"\".concat(subtract ? \"-\" : \"\").concat(splitHMS[1], \":\").concat(splitHMS[2]);\n    }\n  }\n}\nfunction setDropdownSettingHeight(selector) {\n  var selectorElementList = selector.setting.querySelector('#setting-dropdown');\n  var selectorElement = selector.dropdown;\n  var player = selector.parentElement;\n  var offsetHeight = selectorElementList.offsetHeight;\n  var selectorComputed = getComputedStyle(selectorElement);\n  var paddingTop = selectorComputed.paddingTop,\n    paddingBottom = selectorComputed.paddingBottom;\n  var totalHeight = offsetHeight + parseInt(paddingTop) + parseInt(paddingBottom);\n  var style = \"@layer settings \".concat(player.dataset.selector, \" dropdown{height: \").concat(totalHeight, \"px}}\");\n  document.querySelector(\"#videomania-style\").insertAdjacentHTML(\"beforeend\", style);\n}\nfunction onCueChange(event, toggleSubtitle) {\n  for (var j = 0; j < event.target.textTracks.length; j++) {\n    event.target.textTracks[j].mode = toggleSubtitle ? \"showing\" : \"hidden\";\n    for (var i = 0; i < event.target.textTracks[j].cues.length; i++) {\n      event.target.textTracks[j].cues[i].line = -2.5;\n    }\n  }\n}\nfunction checkVideoBuffer(_x7) {\n  return _checkVideoBuffer.apply(this, arguments);\n}\nfunction _checkVideoBuffer() {\n  _checkVideoBuffer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(element) {\n    var checkInterval, lastPlayPos, currentPlayPos, bufferingDetected, evts, video, checkBuffering;\n    return _regeneratorRuntime().wrap(function _callee5$(_context5) {\n      while (1) {\n        switch (_context5.prev = _context5.next) {\n          case 0:\n            checkBuffering = function _checkBuffering() {\n              currentPlayPos = video.currentTime;\n\n              // checking offset should be at most the check interval\n              // but allow for some margin\n              var offset = (checkInterval - 20) / 1000;\n\n              // if no buffering is currently detected,\n              // and the position does not seem to increase\n              // and the player isn't manually paused...\n              if (!bufferingDetected && currentPlayPos < lastPlayPos + offset && !video.paused && video.playable >= 1) {\n                bufferingDetected = true;\n              }\n\n              // if we were buffering but the player has advanced,\n              // then there is no buffering\n              if (bufferingDetected && currentPlayPos > lastPlayPos + offset && !video.paused) {\n                bufferingDetected = false;\n              }\n              lastPlayPos = currentPlayPos;\n              var event = bufferingDetected ? evts[\"default\"].loading : evts[\"default\"].loaded;\n              triggerEvent(event, element);\n            };\n            checkInterval = 50.0; // check every 50 ms (do not use lower values)\n            lastPlayPos = 0;\n            currentPlayPos = 0;\n            bufferingDetected = false;\n            _context5.next = 7;\n            return __webpack_require__.e(/*! import() */ \"src_events_js\").then(__webpack_require__.t.bind(__webpack_require__, /*! ./events.js */ \"./src/events.js\", 23));\n          case 7:\n            evts = _context5.sent;\n            video = element.video;\n            setInterval(checkBuffering, checkInterval);\n          case 10:\n          case \"end\":\n            return _context5.stop();\n        }\n      }\n    }, _callee5);\n  }));\n  return _checkVideoBuffer.apply(this, arguments);\n}\nvar retrieveFormat = function retrieveFormat(url) {\n  return url.split('.')[url.split('.').length - 1].toLowerCase();\n};\nvar triggerEvent = function triggerEvent(eventName, element) {\n  return element.dispatchEvent(new Event(eventName));\n};\n\n//# sourceURL=webpack://my-webpack-project/./src/utils.js?");

/***/ })

}]);