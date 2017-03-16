/*jshint esversion: 6 */

let fs = require('fs');
let http = require('http');
let soap = require('soap');
let express = require('express');
let handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});

let app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

let routes = ['projects'];

const renderView = (res, view = 'home') => {
    res.render(view);
};
const getStatic = (req, res, theRoute = '') => {
    let url = req.originalUrl;
    let pathname = __dirname + url.replace(theRoute, "public");
    let file = fs.createReadStream(pathname);
    file.on("open", function () {
        res.statusCode = 200;
        file.pipe(res);
    });
    file.on("error", function (err) {
        res.statusCode = 404;
        console.log(err);
    });
};

let pathname = __dirname + "/public";
app.use(express.static(pathname));

app.get("/", (req, res) => {
    renderView(res, 'home');
});
//app.get("/projects", (req, res) => {renderView(res, 'projects')});
//app.get("/projects/:id", (req, res) => {renderView(res, 'projects')});

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


app.listen(process.env.PORT || 3000, function () {
    console.log('Приклад застосунку, який прослуховує 3000-ий порт!');
});