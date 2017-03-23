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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views__ = __webpack_require__(3);

let internalRoutes = ["projects"];
let externalRoutes = ["", "home", "apply", "apply-post", "login", "login-post", "about", "contacts", "info1", "info2", "info3"];
const invokeStatic = (app, theRoute) => {
    app.get("/" + theRoute + "/*", (req, res) => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__views__["a" /* getStatic */])(req, res, theRoute);
    });
};
const invokeExternalRoutes = (app) => {
    externalRoutes.forEach((theRoute) => {
        let path = "/" + theRoute;
        if (theRoute.endsWith("-post")) {
            app.post(path, (req, res) => {
                res.redirect(303, "/projects");
            });
        }
        else {
            app.get(path, (req, res) => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__views__["b" /* renderView */])(res, theRoute);
            });
            invokeStatic(app, theRoute);
        }
    });
};
/* harmony export (immutable) */ __webpack_exports__["a"] = invokeExternalRoutes;

const invokeInternalRoutes = (app) => {
    internalRoutes.forEach((theRoute) => {
        app.get("/" + theRoute, (req, res) => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__views__["b" /* renderView */])(res, theRoute, "internal");
        });
        app.get("/" + theRoute + "/:id", (req, res) => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__views__["b" /* renderView */])(res, theRoute, "internal");
        });
        invokeStatic(app, theRoute);
    });
};
/* harmony export (immutable) */ __webpack_exports__["b"] = invokeInternalRoutes;



/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);

const renderView = (res, view = "home", layout = "external") => {
    if (!view || view === "") {
        view = "home";
    }
    ;
    res.render(view, {
        layout
    });
};
/* harmony export (immutable) */ __webpack_exports__["b"] = renderView;

const getStatic = (req, res, theRoute = "") => {
    let url = req.url;
    let pathname = __dirname + url.replace(theRoute, "public");
    let file = __WEBPACK_IMPORTED_MODULE_0_fs__["createReadStream"](pathname);
    file.on("open", () => {
        res.statusCode = 200;
        file.pipe(res);
    });
    file.on("error", (err) => {
        res.statusCode = 404;
        res.sendStatus(404);
        console.log(err);
    });
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getStatic;



/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express_handlebars__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express_handlebars___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express_handlebars__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_routes__ = __webpack_require__(0);
/*jshint esversion: 6 */



const handlebars = __WEBPACK_IMPORTED_MODULE_1_express_handlebars__["create"]({
    defaultLayout: "external"
});
const app = __WEBPACK_IMPORTED_MODULE_0_express__();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
let pathname = __dirname + "/public";
app.use(__WEBPACK_IMPORTED_MODULE_0_express__["static"](pathname));
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_routes__["a" /* invokeExternalRoutes */])(app);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_routes__["b" /* invokeInternalRoutes */])(app);
app.listen(process.env.PORT || 3000, () => {
    console.log("Приклад застосунку, який прослуховує 3000-ий порт!");
});


/***/ })
/******/ ]);
//# sourceMappingURL=server.bundle.js.map