"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpers_1 = require("../../utilities/helpers");
const databaseFolder = path_1.default.join(__dirname, '../../../src/userDatabase');
const databaseFile = path_1.default.join(databaseFolder, 'userDatabase.json');
const userLogin = async (request, response) => {
    try {
        //fetch the email and password from the frontend
        const { email, password } = request.body;
        //read from database
        let databaseData = fs_1.default.readFileSync(databaseFile, "utf-8");
        //checked if database was read successfully
        let database;
        if (!databaseData) {
            return response.status(404).json({
                status: `Database does not exist`,
                message: `error`
            });
        }
        else {
            database = JSON.parse(databaseData);
        }
        //check if user exists
        const checkUser = database.find((user) => user.email === email);
        if (!checkUser) {
            return response.status(404).json({
                status: `Failed`,
                message: `${email} is not in use`
            });
        }
        //check and compare incoming password and password in the database
        const validate = await bcryptjs_1.default.compare(password, checkUser.password);
        if (validate) {
            const data = {
                userId: checkUser.id,
                email: checkUser.email
            };
            const token = await (0, helpers_1.generateToken)(data);
            return response.status(200).json({
                message: `welcome chile`,
                token,
                checkUser
            });
        }
        return response.status(400).json({
            status: `idiot`,
            message: `password incorrect`
        });
    }
    catch (err) {
        console.log(err.message);
        return response.status(500).json({
            message: `Error`
        });
    }
};
exports.userLogin = userLogin;
