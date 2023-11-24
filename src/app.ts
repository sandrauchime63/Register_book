
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv'
import usersRouter from'./routes/users'
import bookRouter from './routes/books'

const app = express();

dotenv.config()



//middleware: It checks things coming from the backend befor it goes to the front end
app.use(logger('dev'));//send logs in the terminal in a way the developer will understand
app.use(express.json());//It changes the json format of frontend data and converts them to a json file
app.use(express.urlencoded({ extended: false }));//data coming from a form is encoded, stored in a url and transfers it to the backend. This is responsible for decoding te data
app.use(cookieParser()); //What does it do??????
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book', bookRouter)
app.listen(process.env.PORT, ()=>{
  console.log(`Listening on port ${process.env.PORT}`)
})

module.exports = app;
