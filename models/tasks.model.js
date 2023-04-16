const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    name: String,
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['Todo', 'Doing', 'Done'],
        default: 'Todo'
    },
    subtasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subtask'
    }]
})

const subtaskSchema = new mongoose.Schema({
    title: String,
    isCompleted: { type: Boolean, default: false }
})

const boardModel = mongoose.model("board", boardSchema);
const taskModel = mongoose.model("Task", taskSchema);
const subtaskModel = mongoose.model("Subtask", subtaskSchema);

module.exports = {
    boardModel, taskModel, subtaskModel
}