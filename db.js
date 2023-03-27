import mongoose from "mongoose";

const conn = async () =>{
    try {
        await mongoose.connect(process.env.DB_URI,{
            dbName: "anketler",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the DB successfully");
    } catch (error) {
        console.log(`DB connection error:, ${error}`);
    }
};

export default conn;
