const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB(){
 try{
      await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database is connected successfully");
 }
 catch(err){
    console.log("MongoDBConnection error",err);
 }
}

module.exports = connectDB;