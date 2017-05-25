import { SlackEvent } from "../../slack/interfaces";
import { Team } from "../../teams/team";
import { SlackApiClient } from "../api/client";

import { Message } from "./message";

export interface Handler {
    type: string;
    handle(team: Team, event: SlackEvent, apiClient: SlackApiClient): void;
}

const handlers: Array<Handler> = [
    Message
];

export default handlers;