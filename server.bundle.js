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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "internalRoutesGet", function() { return internalRoutesGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "externalRoutesGet", function() { return externalRoutesGet; });


let internalRoutesGet = ["projects", "projects/:id"];
let externalRoutesGet = ["", "home", "apply", "about", "contacts", "info1", "info2", "info3"];
//let externalRoutesPost: string[] = ["apply-post", ":customer/login-post"];
const invokeRouteGet = (app, theRoute, view, layout) => {
    app.get("/" + theRoute, (req, res) => {
        let url = req.params.customer || "";
        if (url && !__WEBPACK_IMPORTED_MODULE_0__db__["a" /* customerUrlExist */](url)) {
            let err = "URL \"" + url.toUpperCase() + "\" does not exist. Please enter other one.";
            res.setHeader("Content-Type", "text/plain");
            res.send(400, err);
            return;
        }
        ;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__views__["a" /* renderView */])(res, view, layout);
    });
};
const invokeStaticGet = (app, theRoute) => {
    app.get("/" + theRoute + "/public/*", (req, res) => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__views__["b" /* getStatic */])(req, res, theRoute);
    });
};
const invokeExternalRoutesGet = (app) => {
    invokeRouteGet(app, ":customer/login", "login", "external");
    invokeStaticGet(app, ":customer/login");
    externalRoutesGet.forEach((theRoute) => {
        invokeRouteGet(app, theRoute, theRoute, "external");
        invokeStaticGet(app, theRoute);
    });
};
/* harmony export (immutable) */ __webpack_exports__["invokeExternalRoutesGet"] = invokeExternalRoutesGet;

const invokeInternalRoutesGet = (app) => {
    invokeRouteGet(app, ":customer", "spa", "internal");
    invokeStaticGet(app, ":customer");
    internalRoutesGet.forEach((theRoute) => {
        let path = ":customer/" + theRoute;
        invokeRouteGet(app, path, "spa", "internal");
        invokeStaticGet(app, path);
    });
};
/* harmony export (immutable) */ __webpack_exports__["invokeInternalRoutesGet"] = invokeInternalRoutesGet;

const invokeExternalRoutesPost = (app) => {
    app.post("/apply-post", (req, res) => {
        let err = __WEBPACK_IMPORTED_MODULE_0__db__["b" /* applyNewCustomer */](req.body);
        if (err) {
            res.setHeader("Content-Type", "text/plain");
            res.send(400, err);
            return;
        }
        else {
            res.redirect(303, "/");
        }
    });
    app.post("/:customer/login-post", (req, res) => {
        let url = req.params.customer || "";
        if (url && !__WEBPACK_IMPORTED_MODULE_0__db__["a" /* customerUrlExist */](url)) {
            let err = "URL \"" + url.toUpperCase() + "\" does not exist. Please enter other one.";
            res.setHeader("Content-Type", "text/plain");
            res.send(400, err);
            return;
        }
        ;
        res.redirect(303, "/" + url + "/projects");
    });
};
/* harmony export (immutable) */ __webpack_exports__["invokeExternalRoutesPost"] = invokeExternalRoutesPost;



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
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__routes__ = __webpack_require__(0);

;
;
;
let roles = [
    {
        id: 1,
        name: "manager",
        projects: "write",
        issues: "write",
        persons: "write"
    },
    {
        id: 2,
        name: "employee",
        projects: "read",
        issues: "write",
        persons: "read"
    }
];
let customers = [
    {
        id: 1,
        name: "Geo Alliance",
        isActive: true,
        route: "GA",
        email: "andrew.pshinka@geo-alliance.com.ua",
        phone: "+38067*******",
        person: "andrew.pshinka"
    },
    {
        id: 2,
        name: "l.savostyan",
        isActive: true,
        route: "support",
        email: "l.savostyan@ukr.net",
        phone: "+38063*******",
        person: "l.savostyan@ukr.net"
    }
];
let users = [
    {
        isAdmin: false,
        customerId: 1,
        id: 1,
        name: "bs08@ukr.net",
        password: "123",
        email: "bs08@ukr.net",
        phone: "+38063*******",
        roleId: 2,
        isActive: true
    },
    {
        isAdmin: false,
        customerId: 1,
        id: 2,
        name: "andrew.pshinka@geo-alliance.com.ua",
        password: "456",
        email: "andrew.pshinka@geo-alliance.com.ua",
        phone: "+38067*******",
        roleId: 1,
        isActive: true
    },
    {
        isAdmin: false,
        customerId: 2,
        id: 1,
        name: "bs08@ukr.net",
        password: "123",
        email: "bs08@ukr.net",
        phone: "+38063*******",
        roleId: 2,
        isActive: true
    },
    {
        isAdmin: false,
        customerId: 2,
        id: 2,
        name: "l.savostyan@ukr.net",
        password: "456",
        email: "l.savostyan@ukr.net",
        phone: "+38063*******",
        roleId: 1,
        isActive: true
    },
    {
        isAdmin: true,
        customerId: 0,
        id: 1,
        name: "admin",
        password: "123",
        email: "bs08@ukr.net",
        phone: "+38063*******",
        roleId: undefined,
        isActive: true
    }
];
let projects = [
    {
        customerID: 2,
        id: 1,
        name: "7S",
        charId: "7S"
    },
    {
        customerID: 2,
        id: 2,
        name: "Olga",
        charId: "OLG"
    },
    {
        customerID: 2,
        id: 3,
        name: "Kradojon",
        charId: "KRJ"
    },
    {
        customerID: 1,
        id: 1,
        name: "General project",
        charId: "GA"
    }
];
const getProjects = (params) => {
    return projects.filter((project) => {
        return (!params.charId || project.charId === params.charId)
            && (!params.customerID || project.customerID === params.customerID)
            && (!params.id || project.id === params.id)
            && (!params.name || project.name === params.name);
    });
};
/* unused harmony export getProjects */

const customerUrlExist = (url) => {
    return !!customers.find((item) => {
        return item.route.toLowerCase() === url.toLowerCase();
    });
};
/* harmony export (immutable) */ __webpack_exports__["a"] = customerUrlExist;

const deprecatedCustomer = (data) => {
    let url = data.route;
    let { internalRoutesGet, externalRoutesGet } = __WEBPACK_IMPORTED_MODULE_0__routes__;
    let deprNames = ["login", ...internalRoutesGet, ...externalRoutesGet];
    let itsRoute = !!deprNames.find((route) => url === route);
    if (itsRoute) {
        return url.toUpperCase() + " is deprecated URL. Please enter other one.";
    }
    ;
    let itsPost = url.toLowerCase().endsWith("-post");
    if (itsPost) {
        return "URL should not contain \"-post\"";
    }
    ;
    if (customerUrlExist(url)) {
        return "URL \"" + url.toUpperCase() + "\" allready exist. Please enter other one.";
    }
    ;
    customers = [...customers, Object.assign({}, data)];
};
const applyNewCustomer = (data) => {
    let err = deprecatedCustomer(data);
    if (err) {
        return err;
    }
    ;
};
/* harmony export (immutable) */ __webpack_exports__["b"] = applyNewCustomer;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(8);
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
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express_handlebars__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express_handlebars___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express_handlebars__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_serve_favicon__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_serve_favicon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_serve_favicon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_path__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_routes__ = __webpack_require__(0);
/*jshint esversion: 6 */






const handlebars = __WEBPACK_IMPORTED_MODULE_1_express_handlebars__["create"]({
    defaultLayout: "external"
});
const app = __WEBPACK_IMPORTED_MODULE_0_express__();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
let pathname = __dirname + "/public";
app.use(__WEBPACK_IMPORTED_MODULE_3_serve_favicon__(__WEBPACK_IMPORTED_MODULE_4_path__["join"](__dirname, "public", "favicon.ico")));
app.use("/public", __WEBPACK_IMPORTED_MODULE_0_express__["static"](pathname));
let optionsUrlencoded = { extended: false };
app.use(__WEBPACK_IMPORTED_MODULE_2_body_parser__["urlencoded"](optionsUrlencoded));
//app.use(bodyParser.json());
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_routes__["invokeExternalRoutesGet"])(app);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_routes__["invokeInternalRoutesGet"])(app);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_routes__["invokeExternalRoutesPost"])(app);
app.listen(process.env.PORT || 3000, () => {
    console.log("Приклад застосунку, який прослуховує 3000-ий порт!");
});


/***/ })
/******/ ]);
//# sourceMappingURL=server.bundle.js.map