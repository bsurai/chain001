/*jshint esversion: 6 */
import * as Files from "fs";
import * as Express from "express";
import * as EXHB from "express-handlebars";
import * as core from "express-serve-static-core";

const handlebars:Exphbs = EXHB.create({
    defaultLayout: "main"
});

const app:core.Express = Express();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

let routes:string[] = ["projects"];

const renderView = (res, view = "home") => {
    res.render(view);
};
const getStatic = (req, res, theRoute = "") => {
    let url:string = req.originalUrl;
    let pathname:string = __dirname + url.replace(theRoute, "public");
    let file:Files.ReadStream = Files.createReadStream(pathname);
    file.on("open", () => {
        res.statusCode = 200;
        file.pipe(res);
    });
    file.on("error", (err) => {
        res.statusCode = 404;
        console.log(err);
    });
};

let pathname:string = __dirname + "/public";
app.use(Express.static(pathname));

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