const express=require("express");
const connection=require("./config/db");
const app=express()
var cors = require('cors')
require("dotenv").config();
const PORT=process.env.PORT || 8080
app.use(express.json());
const userRouter=require("./routes/user.route")
const todoRouter=require("./routes/todo.router")
app.use(cors())
app.use("/user",userRouter);
app.use("/todo",todoRouter)



app.listen(PORT,async(req,res)=>{
 try{
    await connection;
    console.log("Connected to database")

 }
 catch(err){
    console.log(err);
    console.log("Couldn't connect to database")
 }

 console.log(`Server is running in ${PORT}`)
})