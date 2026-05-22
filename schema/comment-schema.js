const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comment:{
        type:String,
        required:true
    },

},{timestamps:true});

const COMMENT = mongoose.model('Comment', commentSchema);
module.exports = COMMENT;