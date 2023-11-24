"use strict";
// var express = require('express');
// var router = express.Router();
// import {Request, Response, NextFunction} from "express";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /* GET users listing. */
// router.get('/', function(req:Request, res:Response, next:NextFunction) {
//   res.send('respond with a resource');
// });
// module.exports = router;
const express_1 = __importDefault(require("express"));
const userRegister_1 = require("../controllers/usercontrollers/userRegister");
const userLogin_1 = require("../controllers/usercontrollers/userLogin");
const getSingleUser_1 = require("../controllers/usercontrollers/getSingleUser");
const getAllUsers_1 = require("../controllers/usercontrollers/getAllUsers");
const deleteUser_1 = require("../controllers/usercontrollers/deleteUser");
const router = express_1.default.Router();
router.post("/register", userRegister_1.registerUser);
router.post("/login", userLogin_1.userLogin);
router.delete("/delete/:id", deleteUser_1.deleteUser);
router.get("/getuser/:id", getSingleUser_1.getUser);
router.get("/getalluser", getAllUsers_1.getAllUsers);
exports.default = router;
