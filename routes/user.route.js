const {Router}=require("express");
const User=require("../models/user.model")
const user=Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



user.post("/signup",async(req,res)=>{
   const {email,password}=req.body;
   const check=await User.findOne({email:email})
   if(check){
    res.send({"mesg":"User already exist , please login"})
   }
   else{
        
            bcrypt.hash(password, 4,async function(err, hash) {
                // Store hash in your password DB.
             if(err){
                console.log(err)
                res.send({"mesg":"Something went wrong"})
             }
               const new_user=new User({email:email,password:hash,address:"1234"})
               await new_user.save()
               res.send({"mesg":"User created successfully"})
            });
   }
})

user.post("/login",async(req,res)=>{
   const {email,password}=req.body;
   const document=await User.findOne({email:email});
   const hash=document.password;

   try{
    bcrypt.compare(password, hash).then(function(result) {
        // result == true
        if(result){
            const token = jwt.sign({ email:email,user_id:document._id }, process.env.SECRET_KEY);
            res.send({"mesg":"Login Successful",token:token})
        }
        else{
            res.send({"mesg":"Invalid email/password"})
        }
    });
   }
   catch(err){
    console.log(err)
    res.send({"mesg":"Something went wrong try again"})
   }
  


})

module.exports=user