const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    fileName:{
        type:String,
        required:true
    },
    originalName:{
        type:String,
        required:true
    },
    fileUrl:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

const DOCUMENT = mongoose.model('Document', documentSchema);
module.exports = DOCUMENT;
