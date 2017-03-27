import * as Files from "fs";
import * as core from "express-serve-static-core";

export const renderView = (res: core.Response, view = "home", layout = "external") => {
    if (!view || view === "") { view = "home"; };

    res.render(view, {
        layout
    });
};

export const getStatic = (req: core.Request, res: core.Response, theRoute = "") => {
    let ind: number = req.url.indexOf("/public");
    let url: string = req.url.slice(ind);

    let pathname: string = __dirname + url.replace(theRoute, "public");
    let file: Files.ReadStream = Files.createReadStream(pathname);
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