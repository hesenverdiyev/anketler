import mongoose from "mongoose";

mongoose.set('strictQuery', false);
const conn = () =>{
    mongoose.connect(process.env.DB_URI,{
        dbName: "anketler",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
console.log("Connected to the DB successfully")
    }).catch((err)=>{
        console.log(`DB connection error:, ${err}`)
    })
};

export default conn;