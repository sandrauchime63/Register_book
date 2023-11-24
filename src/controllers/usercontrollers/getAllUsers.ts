import path from 'path';
import fs from 'fs'
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

const databaseFolder = path.join(__dirname, '../../../src/userDatabase')
const databaseFile = path.join(databaseFolder, 'userDatabase.json')



export const getAllUsers = async (req: JwtPayload, res: Response) => {
    try{
        interface User {
            id:string;
            firstName: string;
            lastName: string;
            email:string;
            password:string;
            country:string;
            createdAt: Date;
            updatedAt: Date;
        }

        // const userId = req.params.id

        // if(!userId){
        //     return res.status(400).json({
        //         status: 'Not found',
        //         message: 'Enter a valid user Id'
        //     });
        // }
        let database:User[] = []

        const databaseContent = fs.readFileSync(databaseFile, 'utf-8')
        if(databaseContent){
            database = JSON.parse(databaseContent);
        }else{
            return res.status(400).json({
                status: 'Not found',
                message: 'Internal server error'
            });
        }

        return res.status(200).json({
            status: `Operation successful`,
            database
            
        })


    }catch(err){
    console.log(err);
    return res.status(500).json({
    message: `Unsuccessful`,
    });
    }
}