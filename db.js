import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const conn = () =>{
  mongoose.connect(process.env.DB_URI,{
    dbName: "anketler",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // 30 seconds
    autoReconnect: true // enable auto reconnect
  }).then(()=>{
    console.log("Connected to the DB successfully");
  }).catch((err)=>{
    console.log(`DB connection error: ${err}`);
    setTimeout(() => {
      console.log("Attempting to reconnect to the DB...");
      conn(); // attempt to reconnect
    }, 30000); // wait 30 seconds before attempting to reconnect
  })
};

export default conn;
