import { IncomingMessage, Server, ServerResponse } from "http"
import { playersService } from "../services/players-service"

export const playersController = {


    getPlayersAllList: async (req: IncomingMessage, res: ServerResponse) => {
        const response = await playersService.getPlayersFromRepo(req, res)
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify(response))
    },
    getClubsAllList: async (req: IncomingMessage, res: ServerResponse) => {
        const response = await playersService.getClubsFromRepo(req, res)
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify(response))
    }
}