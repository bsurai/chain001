/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express_handlebars__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express_handlebars___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express_handlebars__);
/*jshint esversion: 6 */



const handlebars = __WEBPACK_IMPORTED_MODULE_2_express_handlebars__["create"]({
    defaultLayout: "main"
});
const app = __WEBPACK_IMPORTED_MODULE_1_express__();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
let routes = ["projects"];
const renderView = (res, view = "home") => {
    res.render(view);
};
const getStatic = (req, res, theRoute = "") => {
    let url = req.originalUrl;
    let pathname = __dirname + url.replace(theRoute, "public");
    let file = __WEBPACK_IMPORTED_MODULE_0_fs__["createReadStream"](pathname);
    file.on("open", () => {
        res.statusCode = 200;
        file.pipe(res);
    });
    file.on("error", (err) => {
        res.statusCode = 404;
        console.log(err);
    });
};
let pathname = __dirname + "/public";
app.use(__WEBPACK_IMPORTED_MODULE_1_express__["static"](pathname));
app.get("/", (req, res) => {
    renderView(res, "home");
});
/*app.get("/*", (req, res) => {
    getStatic(req, res, "");
});*/
routes.forEach((theRoute) => {
    app.get("/" + theRoute, (req, res) => {
        renderView(res, theRoute);
    });
    app.get("/" + theRoute + "/:id", (req, res) => {
        renderView(res, theRoute);
    });
    app.get("/" + theRoute + "/*", (req, res) => {
        getStatic(req, res, theRoute);
    });
}, this);
/*app.get("/*", (req, res) => {
    getStatic(req, res, "");
});*/
app.listen(process.env.PORT || 3000, () => {
    console.log("Приклад застосунку, який прослуховує 3000-ий порт!");
});


/***/ })
/******/ ]);
//# sourceMappingURL=server.bundle.js.map