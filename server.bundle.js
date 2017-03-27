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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views__ = __webpack_require__(4);

let internalRoutesGet = ["projects", "projects/:id"];
let externalRoutesGet = ["", "home", "apply", "about", "contacts", "info1", "info2", "info3"];
let externalRoutesPost = ["apply-post", ":customer/login-post"];
const invokeRouteGet = (app, theRoute, view, layout = "") => {
    app.get("/" + theRoute, (req, res) => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__views__["a" /* renderView */])(res, view, layout);
    });
};
const invokeStaticGet = (app, theRoute) => {
    app.get("/" + theRoute + "/public/*", (req, res) => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__views__["b" /* getStatic */])(req, res, theRoute);
    });
};
const invokeExternalRoutesGet = (app) => {
    invokeRouteGet(app, ":customer/login", "login");
    invokeStaticGet(app, ":customer/login");
    externalRoutesGet.forEach((theRoute) => {
        invokeRouteGet(app, theRoute, theRoute);
        invokeStaticGet(app, theRoute);
    });
};
/* harmony export (immutable) */ __webpack_exports__["a"] = invokeExternalRoutesGet;

const invokeInternalRoutesGet = (app) => {
    invokeRouteGet(app, ":customer", "spa");
    invokeStaticGet(app, ":customer");
    internalRoutesGet.forEach((theRoute) => {
        let path = ":customer/" + theRoute;
        invokeRouteGet(app, path, "spa", "internal");
        invokeStaticGet(app, path);
    });
};
/* harmony export (immutable) */ __webpack_exports__["b"] = invokeInternalRoutesGet;

const invokeExternalRoutesPost = (app) => {
    app.post("/apply-post", (req, res) => {
        res.redirect(303, "/");
    });
    app.post("/:customer/login-post", (req, res) => {
        res.redirect(303, "/" + req.params.customer + "/projects");
    });
    /*externalRoutesPost.forEach((theRoute: string) => {
        let path: string = "/" + theRoute;

        app.post(path, (req: core.Request, res: core.Response) => {
            res.redirect(303, "/projects");
        });
    });*/
};
/* harmony export (immutable) */ __webpack_exports__["c"] = invokeExternalRoutesPost;



/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);

const renderView = (res, view = "home", layout = "") => {
    view = view || "home";
    layout = layout || "external";
    res.render(view, {
        layout
    });
};
/* harmony export (immutable) */ __webpack_exports__["a"] = renderView;

const getStatic = (req, res, theRoute = "") => {
    let ind = req.url.indexOf("/public");
    let url = req.url.slice(ind);
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
/* harmony export (immutable) */ __webpack_exports__["b"] = getStatic;



/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express_handlebars__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express_handlebars___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express_handlebars__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_routes__ = __webpack_require__(0);
/*jshint esversion: 6 */




const handlebars = __WEBPACK_IMPORTED_MODULE_1_express_handlebars__["create"]({
    defaultLayout: "external"
});
const app = __WEBPACK_IMPORTED_MODULE_0_express__();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
let pathname = __dirname + "/public";
app.use("/public", __WEBPACK_IMPORTED_MODULE_0_express__["static"](pathname));
let optionsUrlencoded = { extended: false };
app.use(__WEBPACK_IMPORTED_MODULE_2_body_parser__["urlencoded"](optionsUrlencoded));
//app.use(bodyParser.json());
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib_routes__["a" /* invokeExternalRoutesGet */])(app);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib_routes__["b" /* invokeInternalRoutesGet */])(app);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib_routes__["c" /* invokeExternalRoutesPost */])(app);
app.listen(process.env.PORT || 3000, () => {
    console.log("Приклад застосунку, який прослуховує 3000-ий порт!");
});


/***/ })
/******/ ]);
//# sourceMappingURL=server.bundle.js.map