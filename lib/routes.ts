import * as core from "express-serve-static-core";
import { renderView, getStatic } from "./views";

let internalRoutes: string[] = ["", "projects", "projects/:id"];
let externalRoutes: string[] = ["", "home", "apply", "apply-post", "login", "login-post", "about", "contacts", "info1", "info2", "info3"];

const invokeStatic = (app: core.Express, theRoute: string) => {
    app.get("/" + theRoute + "/public/*", (req, res) => {
        getStatic(req, res, theRoute);
    });
};

export const invokeExternalRoutes = (app: core.Express) => {
    externalRoutes.forEach((theRoute: string) => {
        let path: string = "/" + theRoute;

        if (theRoute.endsWith("-post")) {
            app.post(path, (req: core.Request, res: core.Response) => {
                res.redirect(303, "/projects");
            });
        } else {
            app.get(path, (req: core.Request, res: core.Response) => {
                renderView(res, theRoute);
            });
            invokeStatic(app, theRoute);
        }
    });
};

export const invokeInternalRoutes = (app: core.Express) => {
    internalRoutes.forEach((theRoute: string) => {
        let path: string = ":customer/" + theRoute;
        app.get("/" + path, (req: core.Request, res: core.Response) => {
            renderView(res, "spa", "internal");
        });
        /*app.get("/:customer" + theRoute + "/:id", (req, res) => {
            renderView(res, "spa", "internal");
        });*/
        invokeStatic(app, path);
        // invokeStatic(app, theRoute + "/:id");
    });
    invokeStatic(app, ":customer");
};