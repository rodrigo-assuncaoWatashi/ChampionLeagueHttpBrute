import { IncomingMessage, ServerResponse } from "http"
import { dataController } from "../repo/data-controller"
import { Clubs } from "../contracts/clubs-interface";

export const GenericServices = {
    getFilter:  (req: IncomingMessage): { type: string; id: number } => {
        const url = req.url || "";
        const [path, query] = url.split("?");
        const type = path.split("/")[1];

        const id = query ? Number(new URLSearchParams(query).get("id")) : 0;

        const validId = isNaN(id) ? 0 : id;
        return { type, id: validId };
    },
    getBody: async (req: IncomingMessage): Promise<string> => {
        return new Promise((resolve, reject) => {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString()
            });
            req.on("end", () => {
                body = JSON.parse(body)
                resolve(body);
            });
            req.on("error", (err) => {
                reject(err);
            });
        });
    },
    verifyInterfaceBody: async (type: string , body: Record<string, any>): Promise<boolean> => {
        const requiredFields: Record<string, string[]> = {
            clubs: ["name", "country"],
            players: ["name", "position", "clubId"],
        };
        const fieldsToCheck = requiredFields[type];
        if (!fieldsToCheck) {
            console.error(`Tipo ${type} não é suportado.`);
            return false;
        }
        const missingFields = fieldsToCheck.filter((field) => !body.hasOwnProperty(field));
        if (missingFields.length > 0) {
            console.error(`Campos ausentes no body: ${missingFields.join(", ")}`);
            return false;
        }
        return true;
    },
    getPlayersFromRepo:   (req: IncomingMessage, res: ServerResponse) => {
        const {type, id} = GenericServices.getFilter(req)
        return dataController.genericGetData(type, id)
    },
    getClubsFromRepo:     (req: IncomingMessage, res: ServerResponse) => {
        const {type, id} = GenericServices.getFilter(req)
        return dataController.genericGetData(type, id)
    },
    postPlayersToRepo: async (req: IncomingMessage, res: ServerResponse) => {
        try {
            const { type } = GenericServices.getFilter(req);
            const body = await GenericServices.getBody(req);
            const data = typeof body === "string" ? JSON.parse(body) : body;
            const isValid = await GenericServices.verifyInterfaceBody(type, data);
            if (!isValid) {
                res.statusCode = 400
                return {err: "deu erro"}
            }
            const response = await dataController.insertData(type, data);
            res.statusCode = 201;
            return res.end(JSON.stringify({ message: "Dados salvos com sucesso!", data: response }));
        } catch (err) {
            console.error("Erro ao processar a requisição:", err);
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: "Erro ao processar a requisição." }));
        }
    },
}