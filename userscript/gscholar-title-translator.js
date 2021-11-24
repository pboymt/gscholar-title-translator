// ==UserScript==
// @name 谷歌学术标题翻译
// @namespace http://tampermonkey.net/
// @version 0.2.0
// @description 将谷歌学术搜索结果中的标题翻译为中文
// @author pboymt
// @match http*://scholar.google.com/scholar*
// @require https://cdn.jsdelivr.net/npm/axios@0.24.0
// @require https://cdn.jsdelivr.net/npm/axios-userscript-adapter@~0.1.8/dist/axiosGmxhrAdapter.min.js
// @connect youdao.com
// @grant GM_xmlhttpRequest
// @grant GM_addStyle
// @grant GM.xmlHttpRequest
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const youdao_1 = __webpack_require__(1);
function insertCSS() {
    const style = `
      h3.gs_rt{
        font-size: 14px;
      }
      h3.gtitle_translated{
        font-size: 18px
      }
    `;
    GM_addStyle(style);
}
function main() {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        insertCSS();
        const list = document.querySelectorAll('h3.gs_rt');
        for (let i = 0; i < list.length; i++) {
            const ele = list.item(i);
            let oriTitle = ((_a = ele.textContent) !== null && _a !== void 0 ? _a : '').trim();
            let tagElement = ele.querySelector('span.gs_ctc,span.gs_ctu');
            console.debug(tagElement);
            let tag = undefined;
            let fullTag = undefined;
            if (tagElement) {
                fullTag = (_b = tagElement.textContent) === null || _b === void 0 ? void 0 : _b.trim();
                tag = (_d = (_c = tagElement.firstElementChild) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim();
                if (fullTag)
                    oriTitle = oriTitle.replace(fullTag, '').trim();
            }
            const urlEle = ele.querySelector('a');
            let url = undefined;
            if (urlEle) {
                url = urlEle.href;
            }
            try {
                const res = yield (0, youdao_1.translate_youdao_next)(oriTitle);
                if (!res)
                    return;
                let transTitle = res;
                if (tag) {
                    transTitle = `${tag} ${transTitle}`;
                }
                const nele = document.createElement('h3');
                if (url) {
                    const a = document.createElement('a');
                    a.href = url;
                    a.append(document.createTextNode(transTitle));
                    nele.appendChild(a);
                }
                else {
                    nele.appendChild(document.createTextNode(transTitle));
                }
                nele.classList.add('gtitle_translated');
                (_e = ele.parentNode) === null || _e === void 0 ? void 0 : _e.insertBefore(nele, ele);
            }
            catch (error) {
                console.log('翻译错误');
                console.log(error);
            }
            yield sleep(100 + Math.random() * 100);
        }
    });
}
function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}
main();


/***/ }),
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.translate_youdao_next = void 0;
const axios_1 = __importDefault(__webpack_require__(2));
const axios_userscript_adapter_1 = __importDefault(__webpack_require__(3));
axios_1.default.defaults.adapter = axios_userscript_adapter_1.default;
function translate_youdao_next(text) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let url = `https://dict.youdao.com/jsonapi?xmlVersion=5.1&jsonversion=2&q=${encodeURIComponent(text)}`;
        const res = yield axios_1.default.get(url, {
            headers: {
                'Origin': 'https://dict.youdao.com',
                'Referer': 'https://dict.youdao.com/',
            }
        });
        return (_a = res.data.fanyi) === null || _a === void 0 ? void 0 : _a.tran;
    });
}
exports.translate_youdao_next = translate_youdao_next;


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = axios;

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = axiosGmxhrAdapter;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;