import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utilities/helpers";
import { JwtPayload } from 'jsonwebtoken';

const databaseFolder = path.join(__dirname, '../../../src/userDatabase')
const databaseFile = path.join(databaseFolder, 'userDatabase.json')

export const deleteUser = async(request:JwtPayload, response:Response) => {
    try{
        interface User {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            address: string;
            createdAt: Date;
            updatedAt: Date;
        }

        const id = request.params.id;
        
        let database:User[] = [];

        if(!id){
            return response.status(400).json({
                status: 'Bad request',
                message: 'User ID is required for deletion'
            });
        }


        const databaseData = fs.readFileSync(databaseFile, "utf-8");


        if (!databaseData) {
            return response.status(404).json({
              status: `Failed`,
              message: `Cannot access the Database`,
            });
          } else {
            database = JSON.parse(databaseData);
          }

                // Find the index of the user with the provided ID
        const index = database.findIndex((item) => item.id === id);

        // Check if the user to be deleted belongs to the user
        if (database[index].id !== id){
            return response.status(403).json({
                status: 'Forbidden',
                message: 'You are not authorized to delete this user'
            });
        }
        if (index !== -1) {
            database.splice(index, 1);
        }

        fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2), "utf-8")

        return response.status(200).json({
            status: `Successful`,
            message: `This user has been deleted successfully.`,
            
        })
    }catch(err:any){
        console.log(err.message)
        response.status(500).json({
            message: `Internal Server Error`
        })
    }
}