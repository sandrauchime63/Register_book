import {Request, Response} from 'express'
import path from 'path'
import fs from 'fs'
import bcrypt from 'bcryptjs'
import { generateToken } from '../../utilities/helpers'

const databaseFolder = path.join(__dirname, '../../../src/userDatabase')
const databaseFile = path.join(databaseFolder, 'userDatabase.json')

export const userLogin = async (request:Request, response:Response)=>{
try{
    //fetch the email and password from the frontend
const {email, password}=request.body;

//read from database
let databaseData = fs.readFileSync(databaseFile, "utf-8"
)

//checked if database was read successfully
let database;
if(!databaseData){
    return response.status(404).json({
        status:`Database does not exist`,
        message:`error`
    })
}else{
    database = JSON.parse(databaseData)
}
//check if user exists
const checkUser = database.find((user:any)=>user.email ===email)

if(!checkUser){
    return response.status(404).json({
        status:`Failed`,
        message: `${email} is not in use`
    })
}

//check and compare incoming password and password in the database
const validate = await bcrypt.compare(password, checkUser.password)
if(validate){

    const data ={
        userId:checkUser.id,
        email:checkUser.email
    }
    

const token = await generateToken(data)

return response.status(200).json({
    message: `welcome chile`,
    token,
    checkUser
        
})
}
return response.status(400).json({
    status:`idiot`,
    message:`password incorrect`
})
}catch(err:any){
console.log(err.message)
return response.status(500).json({
    message:`Error`

})
}
}