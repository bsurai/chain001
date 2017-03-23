import * as core from "express-serve-static-core";
import { renderView, getStatic } from "./views";

let internalRoutes: string[] = ["projects"];
let externalRoutes: string[] = ["", "home", "apply", "apply-post", "login", "login-post", "about", "contacts", "info1", "info2", "info3"];

const invokeStatic = (app: core.Express, theRoute: string) => {
    app.get("/" + theRoute + "/*", (req, res) => {
        getStatic(req, res, theRoute);
    });
};

export const invokeExternalRoutes = (app: core.Express) => {
    externalRoutes.forEach((theRoute: string) => {
        let path:string = "/" + theRoute;

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
        app.get("/" + theRoute, (req: core.Request, res: core.Response) => {
            renderView(res, theRoute, "internal");
        });
        app.get("/" + theRoute + "/:id", (req, res) => {
            renderView(res, theRoute, "internal");
        });
        invokeStatic(app, theRoute);
    });
};