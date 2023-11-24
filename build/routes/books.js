"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createBook_1 = require("../controllers/bookcontrollers/createBook");
const authorization_1 = require("../middleware/authorization");
const deleteBook_1 = require("../controllers/bookcontrollers/deleteBook");
const editBook_1 = require("../controllers/bookcontrollers/editBook");
const router = express_1.default.Router();
router.post("/create", authorization_1.authorize, createBook_1.createBook);
router.put("/edit/:id", authorization_1.authorize, editBook_1.editBook);
router.delete("/delete/:id", authorization_1.authorize, deleteBook_1.deleteBook);
exports.default = router;
