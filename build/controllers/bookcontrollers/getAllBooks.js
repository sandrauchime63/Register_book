"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBooks = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const databaseFolder = path_1.default.join(__dirname, '../../../src/bookDatabase');
const databaseFile = path_1.default.join(databaseFolder, 'bookDatabase.json');
const getAllBooks = async (request, response) => {
    try {
        let database = fs_1.default.readFileSync(databaseFile, 'utf-8');
        if (!database) {
            return response.status(404).json({ message: `Oga no database` });
        }
        database = JSON.parse(database);
        return response.status(200).json({ message: `Books fetched successfully`, database });
    }
    catch (err) {
        console.log(err.message);
        return response.status(500).json({
            message: `Internal Server Error`
        });
    }
};
exports.getAllBooks = getAllBooks;
