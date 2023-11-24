"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorize = async (request, response, next) => {
    try {
        const authorization = request.headers.authorization;
        if (authorization === undefined) {
            return response.status(401).json({
                message: `Authorisation failed`,
            });
        }
        const token = authorization.split(" ")[1];
        if (!token || token === "") {
            return response.status(401).json({
                status: `failed`,
                message: `log in!!!!!!!!!!!`,
            });
        }
        const decode = jsonwebtoken_1.default.verify(token, `${process.env.APP_SECRET}`);
        if (decode) {
            request.user = decode;
            next();
        }
        return response.status(401).json({
            message: `invalid token`,
        });
    }
    catch (err) {
        console.log(err.message);
    }
};
exports.authorize = authorize;
