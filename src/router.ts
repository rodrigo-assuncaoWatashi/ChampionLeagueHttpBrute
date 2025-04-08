import { IncomingMessage, ServerResponse } from "http";
import { playersController } from "./controllers/players-controller";

export const routerController = ((req: IncomingMessage, res: ServerResponse) => {
    const baseURL = req.url?.split("/?")[0]
    const api = ""
    switch(req.url){
        case `${api}/players`:
            console.log(`Acessing ${baseURL}`)
            playersController.getPlayersAllList(req, res)
            break
        case `${api}/clubs`:
            console.log(`Acessing ${baseURL}`)
            break
        default:
            break
    }
})