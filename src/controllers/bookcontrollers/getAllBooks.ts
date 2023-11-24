import {Request, Response} from 'express';
import path from 'path';
import fs from 'fs';

const databaseFolder = path.join(__dirname, '../../../src/bookDatabase')
const databaseFile = path.join(databaseFolder, 'bookDatabase.json')

export const getAllBooks = async (request:Request, response:Response)=>{
    try{
        let database = fs.readFileSync(databaseFile, 'utf-8')
        if(!database) {
            return response.status(404).json({message: `Oga no database`})
        }
        database = JSON.parse(database)
    return response.status(200).json({message: `Books fetched successfully`, database})
    }catch(err:any){
        console.log(err.message)
        return response.status(500).json({
            message: `Internal Server Error`
        })
    }
}