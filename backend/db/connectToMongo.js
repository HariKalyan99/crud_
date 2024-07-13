import mongoose from "mongoose";

const connectToMongo = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected successfully: ${conn.connection.host}`)
    } catch (error) {  
        console.log("Error connecting to mongo", error.message);
        process.exit(1)
    }
}

export default connectToMongo;
