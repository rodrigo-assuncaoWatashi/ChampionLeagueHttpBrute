import fs from 'fs';
import { Clubs } from '../contracts/clubs-interface';

export const dataController = {
    dir: "src/repo/",

    getFilteredPaths: (filePrefix: string): string[] => {
        try {
            const files = fs.readdirSync(dataController.dir, "utf-8");
            return files.filter(file => file.endsWith(".json") && file.startsWith(filePrefix));
        } catch (error) {
            console.error("Error reading directory:", error);
            return [];
        }
    },

    sawData: async (filePrefix: string, id?: number | null): Promise<any> => {
        try {
            const filteredPaths = dataController.getFilteredPaths(filePrefix);
            if (filteredPaths.length === 0) {
                throw new Error("No matching files found");
            }

            const filePath = dataController.dir + filteredPaths[0];
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const jsonData = JSON.parse(fileContent);

            if (id === 0) {
                return jsonData;
            } else if (id && id > 0) {
                return jsonData.filter((item: any) => item.id === id);
            }

            return [];
        } catch (error) {
            console.error("Error processing sawData:", error);
            return [];
        }
    },

    insertData: async (filePrefix: string, newData: Clubs): Promise<void> => {
        try {
            const existingData = await dataController.sawData(filePrefix, 0);
            console.log(existingData)
            const filePath = dataController.dir + filePrefix + ".json";

            const updatedData = await [...existingData, newData]
            console.log(existingData)

            fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf-8");
        } catch (error) {
            console.error("Error inserting data:", error);
        }
    },

    genericGetData: async (type: string, id?: number | null): Promise<any> => {
        return await dataController.sawData(type, id);
    }
};
