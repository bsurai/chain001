import * as db from "./db";
import * as core from "express-serve-static-core";
import { renderView, getStatic } from "./views";

export let internalRoutesGet: string[] = ["projects", "projects/:id"];
export let externalRoutesGet: string[] = ["", "home", "apply", "about", "contacts", "info1", "info2", "info3"];
//let externalRoutesPost: string[] = ["apply-post", ":customer/login-post"];

const invokeRouteGet = (app: core.Express, theRoute: string, view: string, layout: string) => {
    app.get("/" + theRoute, (req, res) => {
        let url: string = req.params.customer || "";
        if (url && !db.customerUrlExist(url)) {
            let err: string = "URL \"" + url.toUpperCase() + "\" does not exist. Please enter other one.";
            res.setHeader("Content-Type", "text/plain");
            res.send(400, err);
            return;
        };
        renderView(res, view, layout);
    });
};

const invokeStaticGet = (app: core.Express, theRoute: string) => {
    app.get("/" + theRoute + "/public/*", (req, res) => {
        getStatic(req, res, theRoute);
    });
};

export const invokeExternalRoutesGet = (app: core.Express) => {

    invokeRouteGet(app, ":customer/login", "login", "external");
    invokeStaticGet(app, ":customer/login");

    externalRoutesGet.forEach((theRoute: string) => {
        invokeRouteGet(app, theRoute, theRoute, "external");
        invokeStaticGet(app, theRoute);
    });
};

export const invokeInternalRoutesGet = (app: core.Express) => {
    invokeRouteGet(app, ":customer", "spa", "internal");
    invokeStaticGet(app, ":customer");

    internalRoutesGet.forEach((theRoute: string) => {
        let path: string = ":customer/" + theRoute;
        invokeRouteGet(app, path, "spa", "internal");
        invokeStaticGet(app, path);
    });
};

export const invokeExternalRoutesPost = (app: core.Express) => {
    app.post("/apply-post", (req: core.Request, res: core.Response) => {
        let err: string = db.applyNewCustomer(req.body);
        if (err) {
            res.setHeader("Content-Type", "text/plain");
            res.send(400, err);
            return;
        } else {
            res.redirect(303, "/");
        }
    });

    app.post("/:customer/login-post", (req: core.Request, res: core.Response) => {
        let url: string = req.params.customer || "";
        if (url && !db.customerUrlExist(url)) {
            let err: string = "URL \"" + url.toUpperCase() + "\" does not exist. Please enter other one.";
            res.setHeader("Content-Type", "text/plain");
            res.send(400, err);
            return;
        };
        res.redirect(303, "/" + url + "/projects");
    });
};