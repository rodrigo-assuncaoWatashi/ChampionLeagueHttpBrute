import { IncomingMessage, ServerResponse } from "http";
import { routerController } from "./router";

export const appConfig = ((req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Acess-Control-Allow-Origin", "*")
    routerController(req, res)
})