import { IncomingMessage, ServerResponse } from "http";

export const routerController = ((req: IncomingMessage, res: ServerResponse) => {
    const baseURL = req.url?.split("/?")[0]
    const api = "/api"
    switch(req.url){
        case `${api}/players`:
            console.log(`Acessing ${baseURL}`)
            break
        case `${api}/clubs`:
            console.log(`Acessing ${baseURL}`)
            break
        default:
            break
    }
})