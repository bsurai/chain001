import * as core from "express-serve-static-core";
import { renderView, getStatic } from "./views";

let internalRoutesGet: string[] = ["projects", "projects/:id"];
let externalRoutesGet: string[] = ["", "home", "apply", "about", "contacts", "info1", "info2", "info3"];
let externalRoutesPost: string[] = ["apply-post", ":customer/login-post"];

const invokeRouteGet = (app: core.Express, theRoute: string, view: string, layout: string = "") => {
    app.get("/" + theRoute, (req, res) => {
        renderView(res, view, layout);
    });
};

const invokeStaticGet = (app: core.Express, theRoute: string) => {
    app.get("/" + theRoute + "/public/*", (req, res) => {
        getStatic(req, res, theRoute);
    });
};

export const invokeExternalRoutesGet = (app: core.Express) => {

    invokeRouteGet(app, ":customer/login", "login");
    invokeStaticGet(app, ":customer/login");

    externalRoutesGet.forEach((theRoute: string) => {
        invokeRouteGet(app, theRoute, theRoute);
        invokeStaticGet(app, theRoute);
    });
};

export const invokeInternalRoutesGet = (app: core.Express) => {
    invokeRouteGet(app, ":customer", "spa");
    invokeStaticGet(app, ":customer");

    internalRoutesGet.forEach((theRoute: string) => {
        let path: string = ":customer/" + theRoute;
        invokeRouteGet(app, path, "spa", "internal");
        invokeStaticGet(app, path);
    });
};

export const invokeExternalRoutesPost = (app: core.Express) => {
    app.post("/apply-post", (req: core.Request, res: core.Response) => {
        res.redirect(303, "/");
    });

    app.post("/:customer/login-post", (req: core.Request, res: core.Response) => {
        res.redirect(303, "/" + req.params.customer + "/projects");
    });
};