import mongoose from "mongoose";
import { DB_NAME } from "./constants";
const DB_CONNECT= async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log('ERROR: ', error);
        process.exit(1)
    }
    
}

