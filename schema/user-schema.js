const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,'Duplicate email found']
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type:String,
        enum:["Admin","Superadmin","Manager","Member","Client"],
        required:true
    },
    userImg:{
        type:String,
        required:false
    },
    status: {
        type:String,
        enum:["Active","Inactive"],
        default:'Active'
    }

},{timestamps:true});

const User = mongoose.model('User',userSchema);
module.exports = User;