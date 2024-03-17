const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();
const db_url = process.env.DB_URL;
const Connection = async()=>{
    try {
        await mongoose.connect(`${db_url}`);
        console.log('database Connected SuccessFully');
    } catch (error) {
        console.log('error while connecting to Database',error);
    }
}

module.exports = Connection;