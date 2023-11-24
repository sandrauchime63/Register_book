import { Request, Response } from "express";
import { v4 } from "uuid";
import path from "path";
import fs from "fs";
import { JwtPayload } from "jsonwebtoken";

const databaseFolder = path.join(__dirname, "../../../src/bookDatabase");
const databaseFile = path.join(databaseFolder, "bookDatabase.json");

export const deleteBook = async (request: JwtPayload, response: Response) => {
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
    }

    const userId = request.user.userid;

    const bookId = request.params.id;//what do you do?

    if (!bookId) {
      return response.status(400).json({
        status: "Bad request",
        message: "Book ID is required for editing",
      });
    }

    let database: books[] = [];
    const databaseContent = fs.readFileSync(databaseFile, "utf-8");
    if (databaseContent) {
      database = JSON.parse(databaseContent);
    } else {
      return response.status(400).json({
        status: "Operation failed",
        message: "Information not found in the database",
      });
    }

    // Find the index of the book with the provided ID
    const index = database.findIndex((item) => item.bookId === bookId);

    // Check if the book to be deleted belongs to the user
    if (database[index].ownerId == userId) {
      database.splice(index, 1);
    }else{
      
    }
      

   

    // if (index !== -1)
    //     database[index] =
    // }

    fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8");

    return response.status(200).json({
      status: `Operation successful`,
      message: `This book has been edited successfully.`,
    });
  } catch (err: any) {
    console.log(err.message);
    response.status(500).json({
      message: `Internal Server Error`,
    });
  }
};
