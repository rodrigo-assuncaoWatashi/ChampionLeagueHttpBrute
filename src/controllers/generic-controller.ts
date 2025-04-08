import { IncomingMessage, ServerResponse } from "http"
import { GenericServices } from "../services/generic-service"

export const genericController = {
    getPlayersAllList: async (req: IncomingMessage, res: ServerResponse) => {
        const response = await GenericServices.getPlayersFromRepo(req, res)
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify(response))
    },
    getClubsAllList: async (req: IncomingMessage, res: ServerResponse) => {
        const response = await GenericServices.getClubsFromRepo(req, res)
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify(response))
    },
    postClubs: async (req: IncomingMessage, res: ServerResponse) => {
        const response = await GenericServices.postPlayersToRepo(req, res)
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify(response))
    }
}