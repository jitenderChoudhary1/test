import mongoose from "mongoose";

//define the mongodb connection URL 
// const mongodbURL = "mongodb://127.0.0.1:27017/hotels"
// const mongodbURL = process.env.MONGODB_URL
const mongodbURL =  "mongodb+srv://fasttech:dikonia@cluster0.xlc5qmh.mongodb.net"
//Set up mongodb connection

mongoose.connect(mongodbURL)

const db = mongoose.connection;

db.on("connected", () => {
    console.log("mongodb is connected");
});

db.on("error", (err) => {
    console.log("error:", err);
});

db.on("", () => {
    console.log("mongodb is connected");
});

export default db;
