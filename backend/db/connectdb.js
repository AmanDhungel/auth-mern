import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDb = async () => {
    try {
        console.log("Connecting to MongoDB...");

        // Attempt to establish a connection to the MongoDB database
        const conn = await mongoose.connect(process.env.MONGO_URL);

        console.log(`MongoDB Connected`);
    } catch (err) {
        // Log any error that occurs during connection attempt
        console.error("Error connecting to MongoDB:", err.message);

        // Exit process with failure code
        process.exit(1);
    }
};
