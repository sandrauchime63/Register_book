import path from "path";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import { hashPassword } from "../../utilities/helpers";

const databaseFolder = path.join(__dirname, "../../../src/userDatabase");
const databaseFile = path.join(databaseFolder, "userDatabase.json");

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  createdAt:Date;
  updatedAt:Date;
};
export const registerUser = async (request: Request, response: Response) => {
  try {
    //create datatbase
    if (!fs.existsSync(databaseFolder)) {
      fs.mkdirSync(databaseFolder);
    }
    if (!fs.existsSync(databaseFile)) {
      fs.writeFileSync(databaseFile, "[]", "utf-8");
    }
    //fetch from frontend
    const { firstName, lastName, email, password, address } = request.body;

    // Create a database to store peoples passwords
    // let userObj={
    //     firstName, lastName, email, password, address
    // }

    //parse the database data
    let database: User[] = [];
    //fetch from the datatbase
    const databaseContent = fs.readFileSync(databaseFile, "utf-8");
    try {
      if (!databaseContent) {
        return response.status(400).json({
          status: `Oh no`,
          message: `Never`,
        });
      } else {
        database = JSON.parse(databaseContent);
      }
    } catch (parseError) {
      console.log(parseError)
      database = [];
    }

    //check if user exists
    const findUser = database.find((user: User) => user.email === email);

    if (findUser) {
      return response.status(400).json({
        status: "failed",
        message: `${email} is already in use`,
      });
    }

    //generate salt and hash password
    const hash = await hashPassword(password);
    //generate id's
    const userId = v4();
    //create new user
    const newUser: User = {
      id: userId,
      firstName,
      lastName,
      email,
      password: hash,
      address,
      createdAt:new Date(),
      updatedAt:new Date()
    };

    //add to the database
    database.push(newUser);

    //write to database
    fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");
    //send response to the frontend
    return response.status(200).json({
      status: `Hooray! Pish posh it's functional`,
      message: `Good heavens it works!`,
      newUser,
    });
  } catch (err: any) {
    console.log(err.message);
    response.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};
