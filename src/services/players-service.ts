import { dataController } from "../repo/data-controller"

export const playersService = {
    getPlayersFromRepo: (type: string) => {
        return dataController.genericFunction(type)
    }
}