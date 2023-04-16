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
    const board = req.body;

    console.log(board);
  try {
    const savedSubtasks = await subtaskModel.insertMany(board.tasks.flatMap(task => task.subtasks));

    const savedTasks = await taskModel.insertMany(board.tasks.map(task => ({ ...task, subtasks: savedSubtasks.filter(subtask => task.subtasks.includes(subtask._id)) })));

    const savedBoard = await boardModel.create({ ...board, tasks: savedTasks.map(task => task._id) });

    console.log('Board created:', savedBoard);

    res.send(savedBoard);
  } catch (err) {
    console.log('Error creating board:', err);
    res.status(500).send('Internal server error');
  }
})

TaskRouter.post('/boards/:boardId/tasks', async (req, res) => {
    const { boardId } = req.params;
    const task = req.body;
  
    try {
      const savedSubtasks = await subtaskModel.insertMany(task.subtasks || []);
      const savedTask = await taskModel.create({ ...task, subtasks: savedSubtasks.map(subtask => subtask._id) });
      const board = await boardModel.findByIdAndUpdate(boardId, { $push: { tasks: savedTask._id } }, { new: true });
  
      console.log('Task created:', savedTask);
      console.log('Board created:', board);

      res.send(board);
    } catch (err) {
      console.log('Error creating task:', err);
      res.status(500).send('Internal server error');
    }
  });

//643bb33dfe808a993e75f5de


//new board

// {
//     "name": "My Board",
//     "tasks": [
//       {
//         "title": "My Task",
//         "description": "Description of my task",
//         "status": "Todo",
//         "subtasks": [
//           { "title": "My Subtask 1", "isCompleted": false },
//           { "title": "My Subtask 2", "isCompleted": true }
//         ]
//       }
//     ]
//   }



//new task

// {
//     title: 'My Task',
//     description: 'Description of my task',
//     status: 'Todo',
//     subtasks: [
//       { title: 'My Subtask 1', isCompleted: false },
//       { title: 'My Subtask 2', isCompleted: true }
//     ]
//   }


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