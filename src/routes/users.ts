// var express = require('express');
// var router = express.Router();
// import {Request, Response, NextFunction} from "express";

// /* GET users listing. */
// router.get('/', function(req:Request, res:Response, next:NextFunction) {
//   res.send('respond with a resource');
// });

// module.exports = router;

import express from "express";
import { registerUser } from "../controllers/usercontrollers/userRegister";
import { userLogin } from "../controllers/usercontrollers/userLogin";
import { getUser } from "../controllers/usercontrollers/getSingleUser";
import { getAllUsers } from "../controllers/usercontrollers/getAllUsers";
import { deleteUser } from "../controllers/usercontrollers/deleteUser";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.delete("/delete/:id", deleteUser);
router.get("/getuser/:id", getUser);
router.get("/getalluser", getAllUsers);

export default router;
