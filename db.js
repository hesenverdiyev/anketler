import mongoose from "mongoose";

mongoose.set('strictQuery', false);

// Set appropriate timeouts
const options = {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 30000,
  };

const conn = async () =>{
    try {
        await mongoose.connect(process.env.DB_URI,{
            dbName: "anketler",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            ...options,
        });
        console.log("Connected to the DB successfully");
    } catch (error) {
        console.log(`DB connection error:, ${error}`);
    }
};

export default conn;
