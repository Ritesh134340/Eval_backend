const mongoose=require("mongoose");

const todoSchema=new mongoose.Schema({user_id:String,taskname:String,status:Boolean,tag:String})

const Todo=mongoose.model("todo",todoSchema)

module.exports=Todo;