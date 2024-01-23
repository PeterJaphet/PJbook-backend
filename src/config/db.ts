import mongoose from "mongoose"
import logger from "../utils/logger";

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        mongoose.set('debug', true);
        logger.info(`Mongo DB connected!: ${conn.connection.host}`)
        mongoose.connection.on('connected', () => {
            logger.info(`MongoDB connected: ${conn.connection.host}`);
        });
        
    }
    catch (error:any){
        logger.err(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB