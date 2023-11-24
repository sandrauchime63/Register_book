"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const databaseFolder = path_1.default.join(__dirname, "../../../src/bookDatabase");
const databaseFile = path_1.default.join(databaseFolder, "bookDatabase.json");
const createBook = async (request, response) => {
    try {
        const userId = request.user.userid;
        //create datatbase
        if (!fs_1.default.existsSync(databaseFolder)) {
            fs_1.default.mkdirSync(databaseFolder);
        }
        if (!fs_1.default.existsSync(databaseFile)) {
            fs_1.default.writeFileSync(databaseFile, "[]", "utf-8");
        }
        //fetch from frontend
        const { title, author, description, pageCount, genre, publisher } = request.body;
        // Create a database to store peoples passwords
        // let booksObj={
        //     firstName, lastName, email, password, address
        // }
        //parse the database data
        let database = [];
        //fetch from the datatbase
        const databaseContent = fs_1.default.readFileSync(databaseFile, "utf-8");
        try {
            if (!databaseContent) {
                return response.status(400).json({
                    status: `Oh no`,
                    message: `Never`,
                });
            }
            else {
                database = JSON.parse(databaseContent);
            }
        }
        catch (parseError) {
            console.log(parseError);
            database = [];
        }
        //check if books exists
        const findBooks = database.find((books) => books.title === title);
        if (findBooks) {
            return response.status(400).json({
                status: "failed",
                message: `${title} is already in use`,
            });
        }
        const newBook = {
            title,
            author,
            datePublished: new Date(),
            description,
            pageCount,
            genre,
            bookId: (0, uuid_1.v4)(),
            publisher,
            ownerId: userId,
        };
        database.push(newBook);
        //write to database
        fs_1.default.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");
        //send response to the frontend
        return response.status(200).json({
            status: `Wonderful!`,
            message: `Great job! you can read!`,
            newBook,
        });
        //register books
        // login books
        // create book
        // edit/update book by id
        // delete book by id
        // get single books by id
        // get all bookss
    }
    catch (err) {
        console.log(err.message);
        response.status(500).json({
            status: `You can bring bullet`,
            message: `Try again next time`,
        });
    }
};
exports.createBook = createBook;
