const express=require('express');
const { boardModel, taskModel, subtaskModel } = require('../models/tasks.model');
const TaskRouter=express.Router();

TaskRouter.get("/board",async(req,res)=>{
    try {
        const data= await boardModel.find();
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(404).send({"msg":error.message})
    }
})

TaskRouter.post("/addBoard",async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(404).send({"msg":error.message})
    }
})



module.exports={
    TaskRouter
}


























// ProductRouter.get("/buyproducts",  authorize(["customer", "seller","admin"]), (req, res) => {
//     res.send("You Can buy products")
//   })
  
//   //seller and admin
//   ProductRouter.get("/editproducts",  authorize(["seller","admin"]), (req, res) => {
//   res.send("You are authorized to edit products")
//   })
  
//   // only customer and admin
//   ProductRouter.get("/productreviews", authorize(["customer","admin"]), (req, res) => {
//     res.send("You are authorized to see reviews")
//   })