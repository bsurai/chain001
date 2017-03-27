/*jshint esversion: 6 */
import * as Express from "express";
import * as EXHB from "express-handlebars";
import * as core from "express-serve-static-core";
import { invokeExternalRoutes, invokeInternalRoutes } from "./lib/routes";

const handlebars: Exphbs = EXHB.create({
    defaultLayout: "external"
});

const app: core.Express = Express();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

let pathname: string = __dirname + "/public";
app.use("/public", Express.static(pathname));

invokeExternalRoutes(app);
invokeInternalRoutes(app);

app.listen(process.env.PORT || 3000, () => {
    console.log("Приклад застосунку, який прослуховує 3000-ий порт!");
});
