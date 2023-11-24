import { Request, Response } from "express";
import { v4 } from "uuid";
import path from "path";
import fs from "fs";
import { JwtPayload } from "jsonwebtoken";

const databaseFolder = path.join(__dirname, "../../../src/bookDatabase");
const databaseFile = path.join(databaseFolder, "bookDatabase.json");

export const editBook = async (request: JwtPayload, response: Response) => {
  try {
    interface bookInfo {
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

    const bookId = request.params.id;

    if (!bookId) {
      return response.status(400).json({
        status: "Bad request",
        message: "Book ID is required for editing",
      });
    }

    let database: bookInfo[] = [];
    const databaseContent = fs.readFileSync(databaseFile, "utf-8");
    if (!databaseContent) {
        return response.status(400).json({
            status: "Operation failed",
            message: "Information not found in the database",
          });
      
    } else {
        database = JSON.parse(databaseContent);
    }

    // Find the index of the book with the provided ID
    const index = database.findIndex((item) => item.bookId === bookId);

    // Check if the book to be deleted belongs to the user
    if (database[index].ownerId !== userId) {
      return response.status(403).json({
        status: "Forbidden",
        message: "You are not authorized to edit this book",
      });
    }

    const { title, author, description, pageCount, genre, publisher } =
      request.body;

    database[index] = {
      ...database[index],
      title,
      author,
      description,
      pageCount,
      genre,
      publisher,
    };

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
