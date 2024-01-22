const express=require("express");
require("./dbConn/dbConn");
const dotenv=require("dotenv");

dotenv.config();

const app=express();
PORT = process.env.PORT || 6000;

app.listen(PORT,()=>{
    console.log(`server is running on port : ${PORT}`);
})