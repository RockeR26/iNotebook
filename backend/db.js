//Used to connect Mongo DB Atlas with server  
const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI=process.env.MONGO_DB_KEY


//Mongo connected with node js
const mongoConnect=async ()=>{
    try {
       await mongoose.connect(mongoURI);  
        console.log("Mongo is connected");
    } catch (error) {
        console.log("Mongo is throwing error");
    }  
};



module.exports= mongoConnect;    