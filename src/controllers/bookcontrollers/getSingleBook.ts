import path from 'path';
import {Request, Response} from 'express';
import fs from 'fs';

const databaseFolder = path.join(__dirname, '../../../src/bookDatabase')
const databaseFile = path.join(databaseFolder, 'bookDatabase.json')

export const getSingleBook = async(request:Request, response:Response) => {
    try{
        //get the book id from the params
        const id = request.params.id

        //read from database
        const databaseDocument = fs.readFileSync(databaseFile, "utf-8")

        //throw error if database reading fails
        if(!databaseDocument){
            return response.status(400).json({
                message: `Unable to read from database`
            })
        }

        //parse database data
        let database = JSON.parse(databaseDocument)

        //search for book
        const bookFinder = database.find((book:any)=>book.bookId === id)
        if(!bookFinder){
            return response.status(404).json({
                message: `Book does not exist`
            })
        }

        //return book
        return response.status(200).json({
            message: `${bookFinder.title} found successfully`,
            bookFinder
        }) 
    }catch(err:any){
        console.log(err.message)
        return response.status(500).json({
            message: `Internal Server Error`
        })
    }
}