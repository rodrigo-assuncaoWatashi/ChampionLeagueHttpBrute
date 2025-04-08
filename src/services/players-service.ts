import { IncomingMessage, ServerResponse } from "http"
import { dataController } from "../repo/data-controller"

export const playersService = {
    getFilter: (req: IncomingMessage): { type: string; id: number } => {
        const url = req.url || "";
        const [path, query] = url.split("?");
        const type = path.split("/")[1];

        const id = query ? Number(new URLSearchParams(query).get("id")) : 0;

        const validId = isNaN(id) ? 0 : id;
        return { type, id: validId };
    },

    getPlayersFromRepo: (req: IncomingMessage, res: ServerResponse) => {
        const {type, id} = playersService.getFilter(req)
        return dataController.genericGetData(type, id)
    },
    getClubsFromRepo: (req: IncomingMessage, res: ServerResponse) => {
        const {type, id} = playersService.getFilter(req)
        return dataController.genericGetData(type, id)
    }
}