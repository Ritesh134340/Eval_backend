const jwt=require('jsonwebtoken')
require("dotenv").config();


const authentication=async(req,res,next)=>{
     const token=req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
       if(err){
        console.log(err)
       }
        else{
            req.body.user_id=decoded.user_id
            req.body.email=decoded.email;
            next()
        }

      });
       
}

module.exports=authentication;