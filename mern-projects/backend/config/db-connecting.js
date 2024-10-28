import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();



const dataBaseConnection =() =>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("connecting the mongodb")
    }).catch((error)=>{
        console.log(error)
    })
}

export default dataBaseConnection