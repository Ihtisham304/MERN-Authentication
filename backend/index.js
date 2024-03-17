const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const cookieParser = require('cookie-parser')
const Connection =require('./db/dbConnection');
const userRoute = require('./routes/user');

dotenv.config();
const app = express();
Connection();
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth',userRoute)
app.listen(process.env.PORT,()=>{
    console.log(`app listning on ${process.env.PORT}`);
})