/*jshint esversion: 6 */
import * as Files from "fs";
import * as Express from "express";
import * as EXHB from "express-handlebars";
import * as core from "express-serve-static-core";
// import * as DB from "./lib/db";


/*let proj:DB.IProjects[] = DB.getProjects({
    customerID: undefined,
    id: undefined,
    name: undefined,
    charId: undefined
});*/
const handlebars: Exphbs = EXHB.create({
    defaultLayout: "external"
});

const app: core.Express = Express();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

let internalRoutes: string[] = ["projects"];

const renderView = (res, view = "home", layout = "external") => {
    res.render(view, {
        layout
    });
};
const getStatic = (req, res, theRoute = "") => {
    let url: string = req.originalUrl;
    let pathname: string = __dirname + url.replace(theRoute, "public");
    let file: Files.ReadStream = Files.createReadStream(pathname);
    file.on("open", () => {
        res.statusCode = 200;
        file.pipe(res);
    });
    file.on("error", (err) => {
        res.statusCode = 404;
        console.log(err);
    });
};

let pathname: string = __dirname + "/public";
app.use(Express.static(pathname));

app.get("/", (req, res) => {
    renderView(res, "home");
});

internalRoutes.forEach((theRoute) => {
    app.get("/" + theRoute, (req, res) => {
        renderView(res, theRoute, "internal");
    });
    app.get("/" + theRoute + "/:id", (req, res) => {
        renderView(res, theRoute, "internal");
    });
    app.get("/" + theRoute + "/*", (req, res) => {
        getStatic(req, res, theRoute);
    });
}, this);

app.listen(process.env.PORT || 3000, () => {
    console.log("Приклад застосунку, який прослуховує 3000-ий порт!");
});