import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const conn = () => {
  mongoose.connect(process.env.DB_URI,{
    dbName: "anketler",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // 30 seconds
    reconnectTries: Number.MAX_VALUE, // retry indefinitely
    reconnectInterval: 1000 // wait 1 second before retrying
  }).then(()=>{
    console.log("Connected to the DB successfully");
  }).catch((err)=>{
    console.log(`DB connection error: ${err}`);
    setTimeout(() => {
      console.log("Attempting to reconnect to the DB...");
      conn(); // attempt to reconnect
    }, 1000); // wait 1 second before attempting to reconnect
  })
};

export default conn;
