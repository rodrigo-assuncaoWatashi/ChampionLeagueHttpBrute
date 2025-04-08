import fs from 'fs';

export const dataController = {
    sawData: async (json: string): Promise<string[]> => {
        console.log(json);
        const path = fs.readdirSync("src/repo", "utf-8");

        if (path) {
            const filteredPaths = path.filter(dir => dir.endsWith(".json") && dir.startsWith(json));
            console.log(filteredPaths);
            return filteredPaths;
        }

        return [];
    },

    genericFunction: (type: string) => {
        console.log(type)
        const response =  dataController.sawData(type)
        return response
    }
}