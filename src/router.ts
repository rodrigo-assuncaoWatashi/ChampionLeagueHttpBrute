import { IncomingMessage, ServerResponse } from "http";
import { genericController } from "./controllers/generic-controller";

export const routerController = ((req: IncomingMessage, res: ServerResponse) => {
    const baseURL = req.url?.split("/?")[0]
    console.log(baseURL)
    const api = ""
    if(req.method === "GET"){
    switch(baseURL){
        case `${api}/players`:
            console.log(`Acessing ${baseURL}`)
            genericController.getPlayersAllList(req, res)
            break
        case `${api}/clubs`:
            console.log(`Acessing ${baseURL}`)
            genericController.getClubsAllList(req, res)
            break
        case "/favicon.ico":
            break;
        default:
            break
        }
    }else if(req.method === "POST") {
    switch(baseURL){
        case `${api}/players`:
            console.log(`Acessing ${baseURL}`)
            genericController.postClubs(req.)
            break
        case `${api}/clubs`:
            console.log(`Acessing ${baseURL}`)
            genericController.postClubs(req, res)
            break
        case "/favicon.ico":
            break;
        default:
            break
        }
    }
})