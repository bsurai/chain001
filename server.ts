/*jshint esversion: 6 */
import * as Express from "express";
import * as EXHB from "express-handlebars";
import * as bodyParser from "body-parser";
import * as favicon from "serve-favicon";
import * as core from "express-serve-static-core";
import * as path from "path";
import { invokeExternalRoutesGet, invokeInternalRoutesGet, invokeExternalRoutesPost } from "./lib/routes";

const handlebars: Exphbs = EXHB.create({
    defaultLayout: "external"
});

const app: core.Express = Express();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

let pathname: string = __dirname + "/public";
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use("/public", Express.static(pathname));

let optionsUrlencoded: bodyParser.OptionsUrlencoded = { extended: false };
app.use(bodyParser.urlencoded(optionsUrlencoded));
//app.use(bodyParser.json());

invokeExternalRoutesGet(app);
invokeInternalRoutesGet(app);
invokeExternalRoutesPost(app);

app.listen(process.env.PORT || 3000, () => {
    console.log("Приклад застосунку, який прослуховує 3000-ий порт!");
});
