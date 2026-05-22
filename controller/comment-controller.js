const COMMENT = require("../schema/comment-schema");
const mongoose = require('mongoose');
const Task = require("../schema/task-schema");
const commentCreateFun = async (req,res) => {
    try {
        const loginUser = req["user"];

        const {taskId, comment} = req.body;
        if(!mongoose.isValidObjectId(taskId)) {
            return res.status(400).json({ message: 'Invalid taskId format' });
        };
        const newComment = await COMMENT.create({
            taskId,
            userId : loginUser._id,
            comment
        });
        return res.status(201).json({status:'Success', message:"Comment created successfully", data:newComment})
    } catch (error) {
        console.log('error',error)
    }
};
const allCommentFun = async(req,res) => {
    try {
        const all_data = await COMMENT.find({}).exec();
        return res.status(200).json({status:'Success', data:all_data})
    } catch (error) {
       console.log('error',error) 
    }
};

const gettingCommentByTaskIdFun = async(req,res) => {
    try {
        const paramId = req.params.id;

        if(!mongoose.isValidObjectId(paramId)) {
            return res.status(400).json({ message: 'Invalid id format' });
        };
        const allTask = await COMMENT.find({taskId:paramId}).populate('userId')
        return res.status(200).json({status:'Success',data:allTask})
    } catch (error) {
        console.log('error',error)
    }
};
const updateCommentFun = async (req,res) => {
    try {
        const paramId = req.params.id;
        if(!mongoose.isValidObjectId(paramId)) {
            return res.status(400).json({status:'Failed', message:"Invalid id format"})
        };

        const udpateCmt = await COMMENT.findByIdAndUpdate(paramId, req.body, {new :true , runValidators:true});
        return res.status(201).json({status:'Success',message:"Comment updated sucessfully", data:udpateCmt})
    } catch (error) {
        console.log('error',error)
    }
};

const deleteCommentFun = async(req,res) => {
    try {
        const paramId = req.params.id;
        if(!mongoose.isValidObjectId(paramId)) {
            return res.status(400).json({status:"Failed", message:"Invalid id format"})
        };
        console.log('deleteParamId',paramId)
        await COMMENT.findByIdAndDelete(paramId);
        return res.status(200).json({status:"Success", message:"Comment deleted successfully"})
    } catch (error) {
        console.log('error',error)
    }
};

module.exports = {
    commentCreateFun,
    allCommentFun,
    gettingCommentByTaskIdFun,
    updateCommentFun,
    deleteCommentFun
}