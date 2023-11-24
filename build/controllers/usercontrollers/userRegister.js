"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const helpers_1 = require("../../utilities/helpers");
const databaseFolder = path_1.default.join(__dirname, "../../../src/userDatabase");
const databaseFile = path_1.default.join(databaseFolder, "userDatabase.json");
const registerUser = async (request, response) => {
    try {
        //create datatbase
        if (!fs_1.default.existsSync(databaseFolder)) {
            fs_1.default.mkdirSync(databaseFolder);
        }
        if (!fs_1.default.existsSync(databaseFile)) {
            fs_1.default.writeFileSync(databaseFile, "[]", "utf-8");
        }
        //fetch from frontend
        const { firstName, lastName, email, password, address } = request.body;
        // Create a database to store peoples passwords
        // let userObj={
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
        //check if user exists
        const findUser = database.find((user) => user.email === email);
        if (findUser) {
            return response.status(400).json({
                status: "failed",
                message: `${email} is already in use`,
            });
        }
        //generate salt and hash password
        const hash = await (0, helpers_1.hashPassword)(password);
        //generate id's
        const userId = (0, uuid_1.v4)();
        //create new user
        const newUser = {
            id: userId,
            firstName,
            lastName,
            email,
            password: hash,
            address,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        //add to the database
        database.push(newUser);
        //write to database
        fs_1.default.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");
        //send response to the frontend
        return response.status(200).json({
            status: `Hooray! Pish posh it's functional`,
            message: `Good heavens it works!`,
            newUser,
        });
    }
    catch (err) {
        console.log(err.message);
        response.status(500).json({
            status: "failed",
            message: "Internal server error",
        });
    }
};
exports.registerUser = registerUser;
