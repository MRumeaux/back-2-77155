import envs from './config.js';
import { connect } from "mongoose";

export const initMongoDB = async() => {
    try {
        await connect(envs.URLMongo);
        //await mongoose.connect(envs.MONGO_ATLAS_URL);
    } catch (error) {
        throw new Error(`Error connecting to MongoDB: ${error}`);
    }
}

