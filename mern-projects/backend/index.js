import express from 'express'
import dotenv from 'dotenv'
import userRouter from './router/user.js'
import TweetRouter from './router/Tweet.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dataBaseConnection from './config/db-connecting.js';
dotenv.config();
const app = express();

dataBaseConnection();
const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOption));

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/user', userRouter)
app.use('/api/tweet', TweetRouter)


app.listen(process.env.PORT,()=>{
    console.log(`server are connenting ${process.env.PORT}`)
})
