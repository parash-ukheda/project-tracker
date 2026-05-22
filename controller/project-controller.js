const { validationResult } = require("express-validator");
const Project = require("../schema/project-schema");
const mongoose = require('mongoose');
const { getIO } = require('../middleware/socket')
const projectCreateFun = async (req, res) => {
    console.log('createProject',req.body)
  try {
    const createdId = req["user"];
    const {
      projectName,
      description,
      clientName,
      plantName,
      manager,
      status,
      startDate,
      dueDate,
      progress
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const new_project = await Project.create({
      projectCreatedBy: createdId._id,
      projectName,
      manager,
      description,
      clientName,
      plantName,
      status,
      startDate,
      dueDate,
      progress
    });
        getIO().emit('project_created', new_project)
    return res
      .status(201)
      .json({
        status: "Success",
        message: "Project created successfully",
        data: new_project,
      });
  } catch (error) {
    console.log("error", error)
  }
};

const getProjectFun = async(req,res) => {
    try {
        const paramId = req.params.id;
        if(!mongoose.isValidObjectId(paramId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        };

        const find_project = await Project.findOne({_id:paramId});
        if(!find_project) {
            return res.status(404).json({status:'Failed', message:"Project not found"})
        };
        return res.status(200).json({status:'Success', data: find_project})
    } catch (error) {
        console.log('error',error)
    }
};

const getAllProject = async(req,res) => {
    try {
        const allproject = await Project.find({}).exec();
        return res.status(200).json({status:'Success',data:allproject})
    } catch (error) {
        console.log('error',error)
    }
};

const updateProject = async (req,res) => {
    try {
        const paramId = req.params.id;
        console.log('paramId',paramId)
          if(!mongoose.isValidObjectId(paramId)) {
              return res.status(400).json({ message: 'Invalid ID format' });
          };
        const updateProject = await Project.findByIdAndUpdate(paramId, req.body, {new:true, runValidators:true});
        if(!updateProject) {
            return res.status(404).json({status:'Failed', message:"Project not found"})
        };
        return res.status(200).json({status:'Success', message:"Project updated successfully", data:updateProject})
    } catch (error) {
        console.log('error',error);
    }
};

const deleteProject = async (req,res) => {
    try {
          const paramId = req.params.id;
          if(!mongoose.isValidObjectId(paramId)) {
              return res.status(400).json({ message: 'Invalid ID format' });
          };
          
          const findproject = await Project.findByIdAndDelete(paramId);
          if(!findproject) {
            return res.status(404).json({status:'Failed', message:"Project not found"})
          }
          return res.status(200).json({status:'Success',message:"Project deleted successfully."})
    } catch (error) {
        console.log('error',error)
    }
}

module.exports = {
  projectCreateFun,
  getProjectFun,
  getAllProject,
  updateProject,
  deleteProject
};
