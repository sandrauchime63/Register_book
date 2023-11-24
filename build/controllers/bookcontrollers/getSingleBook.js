"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleBook = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const databaseFolder = path_1.default.join(__dirname, '../../../src/bookDatabase');
const databaseFile = path_1.default.join(databaseFolder, 'bookDatabase.json');
const getSingleBook = async (request, response) => {
    try {
        //get the book id from the params
        const id = request.params.id;
        //read from database
        const databaseDocument = fs_1.default.readFileSync(databaseFile, "utf-8");
        //throw error if database reading fails
        if (!databaseDocument) {
            return response.status(400).json({
                message: `Unable to read from database`
            });
        }
        //parse database data
        let database = JSON.parse(databaseDocument);
        //search for book
        const bookFinder = database.find((book) => book.bookId === id);
        if (!bookFinder) {
            return response.status(404).json({
                message: `Book does not exist`
            });
        }
        //return book
        return response.status(200).json({
            message: `${bookFinder.title} found successfully`,
            bookFinder
        });
    }
    catch (err) {
        console.log(err.message);
        return response.status(500).json({
            message: `Internal Server Error`
        });
    }
};
exports.getSingleBook = getSingleBook;
