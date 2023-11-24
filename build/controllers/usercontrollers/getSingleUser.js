"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const databaseFolder = path_1.default.join(__dirname, '../../../src/userDatabase');
const databaseFile = path_1.default.join(databaseFolder, 'userDatabase.json');
const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                status: 'Not found',
                message: 'Enter a valid user Id'
            });
        }
        let database = [];
        const databaseContent = fs_1.default.readFileSync(databaseFile, 'utf-8');
        if (databaseContent) {
            database = JSON.parse(databaseContent);
        }
        else {
            return res.status(400).json({
                status: 'Not found',
                message: 'Internal server error'
            });
        }
        // Find the index of the user with the provided ID
        const userData = database.find((item) => item.id === userId);
        return res.status(200).json({
            status: `Operation successful`,
            userData
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: `Unsuccessful`,
        });
    }
};
exports.getUser = getUser;
