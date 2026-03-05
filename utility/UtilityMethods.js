import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const filePath = process.env.FILE_PATH;

export class UtilityMethods {
    async readJsonFile(fileName){
        const fullPath = `${filePath}/${fileName}`;
        const jsonData = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        return jsonData;
    }
}

module.exports = { UtilityMethods };