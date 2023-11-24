import path from "path";
import { Request, Response } from "express";
import { v4 } from "uuid";
import fs from "fs";
import { JwtPayload } from "jsonwebtoken";

const databaseFolder = path.join(__dirname, "../../../src/bookDatabase");
const databaseFile = path.join(databaseFolder, "bookDatabase.json");

export const createBook = async (request: JwtPayload, response: Response) => {
  try {
    type books = {
      title: string;
      author: string;
      datePublished: Date;
      description: string;
      pageCount: number;
      genre: string;
      bookId: string;
      publisher: string;
      ownerId: string;
    };

    const userId = request.user.userid;

    //create datatbase
    if (!fs.existsSync(databaseFolder)) {
      fs.mkdirSync(databaseFolder);
    }
    if (!fs.existsSync(databaseFile)) {
      fs.writeFileSync(databaseFile, "[]", "utf-8");
    }
    //fetch from frontend
    const { title, author, description, pageCount, genre, publisher } =
      request.body;

    // Create a database to store peoples passwords
    // let booksObj={
    //     firstName, lastName, email, password, address
    // }

    //parse the database data
    let database: books[] = [];
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
      console.log(parseError);
      database = [];
    }

    //check if books exists
    const findBooks = database.find((books: books) => books.title === title);

    if (findBooks) {
      return response.status(400).json({
        status: "failed",
        message: `${title} is already in use`,
      });
    }

    const newBook: books = {
      title,
      author,
      datePublished: new Date(),
      description,
      pageCount,
      genre,
      bookId: v4(),
      publisher,
      ownerId: userId,
    };

    database.push(newBook);

    //write to database
    fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");
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
  } catch (err: any) {
    console.log(err.message);
    response.status(500).json({
      status: `You can bring bullet`,
      message: `Try again next time`,
    });
  }
};
