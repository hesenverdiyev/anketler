import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const conn = async () =>{
    try {
        await mongoose.connect(process.env.DB_URI,{
            dbName: "anketler",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoReconnect: true,
            reconnectTries: 3,
            reconnectInterval: 5000,
        });
        console.log("Connected to the DB successfully");
    } catch (error) {
        console.log(`DB connection error:, ${error}`);
    }
};

export default conn;
