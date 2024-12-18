import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        
        // Debug log to check the URI
        console.log("Attempting to connect with URI:", process.env.MONGODB_URI);
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
        return connectionInstance
    } catch (error) {
        console.log('MONGODB CONNECTION ERROR: ', error);
        process.exit(1)
    }
}

export default connectDB

