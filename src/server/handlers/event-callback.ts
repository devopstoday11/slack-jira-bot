import * as logger from "winston";
import { NextFunction, Response } from "express";

import { SlackCallbackRequest } from "../interfaces/slack";


export class EventCallback {

    public static get type() {
       return "event_callback";
    }

    public static handle(req: SlackCallbackRequest, res: Response, next: NextFunction) {
        res.status(200);
        res.end();

        const bot = req.app.locals.bot;
        bot.receive(req.body);

        logger.debug(`New Event Callback: ${JSON.stringify(req.body)}`);
    }

}

