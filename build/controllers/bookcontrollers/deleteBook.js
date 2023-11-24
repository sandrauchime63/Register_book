"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const databaseFolder = path_1.default.join(__dirname, "../../../src/bookDatabase");
const databaseFile = path_1.default.join(databaseFolder, "bookDatabase.json");
const deleteBook = async (request, response) => {
    try {
        const userId = request.user.userid;
        const bookId = request.params.id; //what do you do?
        if (!bookId) {
            return response.status(400).json({
                status: "Bad request",
                message: "Book ID is required for editing",
            });
        }
        let database = [];
        const databaseContent = fs_1.default.readFileSync(databaseFile, "utf-8");
        if (databaseContent) {
            database = JSON.parse(databaseContent);
        }
        else {
            return response.status(400).json({
                status: "Operation failed",
                message: "Information not found in the database",
            });
        }
        // Find the index of the book with the provided ID
        const index = database.findIndex((item) => item.bookId === bookId);
        // Check if the book to be deleted belongs to the user
        if (database[index].ownerId == userId) {
            database.splice(index, 1);
        }
        else {
        }
        // if (index !== -1)
        //     database[index] =
        // }
        fs_1.default.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");
        return response.status(200).json({
            status: `Operation successful`,
            message: `This book has been edited successfully.`,
        });
    }
    catch (err) {
        console.log(err.message);
        response.status(500).json({
            message: `Internal Server Error`,
        });
    }
};
exports.deleteBook = deleteBook;
