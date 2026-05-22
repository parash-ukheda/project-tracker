const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    },
    title:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
     progress:{
        type:Number,
        required:true
    },
    phase: {
        type:String,
        required:true
    },
    assignee: {
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Todo","In Progress","Review","Done"],
        default:"Todo"
    },
    priority: {
        type:String,
        enum:["Low","Medium","High"]
    },
   
    startDate: {
        type:String,
        required:true
    },
    dueDate:{
        type:String,
        required:true
    },
},{timestamps:true});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;