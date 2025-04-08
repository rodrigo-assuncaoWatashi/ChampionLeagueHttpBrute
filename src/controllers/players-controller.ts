import { IncomingMessage, ServerResponse } from "http"
import { playersService } from "../services/players-service"

export const playersController = {
    getFilter: async (req: IncomingMessage) => {
        const filter = req.url?.split("/")[1]
        return JSON.stringify(filter)
    },

    getPlayersAllList: async (req: IncomingMessage, res: ServerResponse) => {
        const filter = await playersController.getFilter(req)
        const response = await playersService.getPlayersFromRepo(filter)
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify(response))
    }
}