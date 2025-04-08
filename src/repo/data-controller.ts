import fs from 'fs';

export const dataController = {
    dir: "src/repo/",
    sawData: async (json: string, id?: number | null): Promise<string[] | string> => {
        const path = fs.readdirSync(dataController.dir, "utf-8");

        if (path && id === 0) {
            const filteredPaths = path.filter(dir => dir.endsWith(".json") && dir.startsWith(json));
            const sawData = fs.readFileSync(dataController.dir+filteredPaths[0], "utf-8")
            const response = JSON.parse(sawData)
            return response
        }
        else if (path && id != undefined && id > 0){
            console.log(id)
            const filteredPaths = path.filter(dir => dir.endsWith(".json") && dir.startsWith(json));
            const sawData = fs.readFileSync(dataController.dir+filteredPaths[0], "utf-8")
            const nonFiltered = JSON.parse(sawData)
            const response = nonFiltered.filter(name => name.id === id)
            return response
        }

        return [];
    },

    genericGetData: (type: string, id?: number | null ) => {
        const response =  dataController.sawData(type, id)
        return response
    }
}