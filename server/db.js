const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("mongoDB connected successfully.");
    } catch(err) {
        console.log("mongoDB connection failed.", err.message);
    }
}

module.exports = connectToMongo;