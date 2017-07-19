import * as logger from "winston";
import { NextFunction, Request, Response, Router } from "express";

import { BaseRoute } from "./route";
import { SlackEventMetaData } from "../../slack/interfaces";
import slackEventHandlers from "../handlers/handles";

export class IndexRoute extends BaseRoute {

    constructor() {
        super();
    }

    public get(req: Request, res: Response, next: NextFunction) {
        res.sendStatus(200);
        res.end();
    }

    public post(req: Request, res: Response, next: NextFunction) {
        const payload: SlackEventMetaData = req.body;

        logger.debug(payload);

        const handler = slackEventHandlers.find(handler => {
            return handler.type === payload.type;
        });

        if (handler)
            handler.handle(req, res, next);
    }

    public static create(router: Router) {
        const route = new IndexRoute();

        // add empty return
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            route.get(req, res, next);
        });


        //  add home page route
        router.post("/", (req: Request, res: Response, next: NextFunction) => {
            route.post(req, res, next);
        });
    }

}