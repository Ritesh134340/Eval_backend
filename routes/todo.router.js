const {Router}=require("express");
const authentication=require("../middleware/authentication");
const todo=Router();
const Todo=require("../models/todo.model")


todo.get("/",authentication,async(req,res)=>{
    console.log(req.query)
   try{
    const user_id=req.body.user_id;
    const document=await Todo.find( req.query || {user_id:user_id} )
    
    res.send({"mesg":"Successful",data:document})
   }
   catch(err){
    console.log(err)
    res.send({"mesg":"something went wrong"})
   }
    
})


todo.post("/create",authentication,async(req,res)=>{
    const {taskname,tag,user_id}=req.body;
    try{
        const new_todo=new Todo({user_id:user_id,taskname:taskname,status:false,tag:tag})
        await new_todo.save()
        res.send({"mesg":"Todo created successfully"})
    }
    catch(err){
        res.send({"mesg":"couldn't create todo"})
    }
})

todo.delete("/delete/:id",authentication,async(req,res)=>{
    const id=req.params.id;
   
    try{
       await  Todo.findByIdAndDelete({_id:id})
        res.send({"mesg":"Todo deleted successfully"})
    }
    catch(err){
        console.log(err)
        res.send({"mesg":"couldn't delete todo"})
    }
})


todo.patch("/update/:id",authentication,async(req,res)=>{
    const id=req.params.id ;
    const data=req.body;
    try{
        await Todo.findOneAndUpdate(id,data)  
        res.send({"mesg":"update successful"}) 
    }
    catch(err){
        console.log(err)
        res.send({"mesg":"couldn't update todo"})
    }

})



module.exports=todo;