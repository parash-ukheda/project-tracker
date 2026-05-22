const { validationResult } = require("express-validator");
const Task = require("../schema/task-schema");
const User = require("../schema/user-schema");
const Project = require("../schema/project-schema");
const mongoose = require('mongoose')

const createTaskFun = async (req,res) => {
    try {
        const {title,description,priority,assignee,startDate,dueDate,phase,projectName,status,progress} = req.body;
        console.log('projectName',projectName)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        };
        let project_Id = await Project.findOne({projectName:projectName})
        const newTask = await Task.create({
            projectId:project_Id._id,
            title,
            phase,
            description,
            progress,
            priority,
            assignee,
            status,
            startDate,
            dueDate
        });
// const msg = "Parash is testing the email system. Please ignore this email and do not reply for your privacy."
// EmailSendFun('parashukheda11@gmail.com', 'Hello', msg)
        return res.status(201).json({status:'Success',message:"Task Created successfully", data:newTask})

    } catch (error) {
        console.log('error',error)
    }
};

const getAllTask = async(req,res) => {
    try {
        const all = await Task.find({}).populate('projectId');
        return res.status(200).json({status:'Success', data:all})
    } catch (error) {
        console.log('error',error)
    }
};

const taskDeleteFun = async (req,res) => {
    try {
        const paramId = req.params.id;
        console.log('paramId',paramId)
          if(!mongoose.isValidObjectId(paramId)) {
              return res.status(400).json({ message: 'Invalid ID format' });
          }
        const deleteTask = await Task.findByIdAndDelete(paramId);
        return res.status(200).json({status:'Success',message:"Task deleted successfully."})
    } catch (error) {
        console.log('error',error)
    }
};

const taskUpdate = async (req,res) => {
    try {
        const paramId = req.params.id;
        console.log('paramId',paramId)
     if(!mongoose.isValidObjectId(paramId)) {
              return res.status(400).json({ message: 'Invalid ID format' });
     };
     const updateTask = await Task.findByIdAndUpdate(paramId,req.body , {new:true,runValidators:true});
     return res.status(201).json({status:'Success',message:"Task updated successfully", data:updateTask})
    } catch (error) {
        console.log('error',error)
    }
}



module.exports = {
    createTaskFun,
    getAllTask,
    taskDeleteFun,
    taskUpdate
}