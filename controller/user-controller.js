const { validationResult } = require("express-validator");
const mongoose = require('mongoose');
const User = require("../schema/user-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  tokenCreate,
  matchPassword,
} = require("../middleware/service-middleware");

const createUser = async (req, res) => {
  try {
    const { fullName, email, password, role, status } = req.body;
       if(!email || !email.endsWith('@aispl.co')) {
          return res.status(403).json({status:"Failed",message:"Registration is restricted to authorized aispl.co email addresses."})
        }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const checkuser = await User.findOne({ email: email });
    if (checkuser) {
      return res.status(409).json({ message: "User already registered" });
    }

    const hashPassword = await bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUND),
    );
    const newUser = await User.create({
      fullName,
      email,
      password: hashPassword,
      role,
      status,
    });

    return res
      .status(201)
      .json({
        status: "Success",
        message: "User created successfully.",
        data: newUser,
      });
  } catch (error) {
    console.log("error", error);
  }
};


const getSingleUser = async(req,res) => {
  try {
     const paramId = req.params.id;
    if(!mongoose.isValidObjectId(paramId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    const single_user = await User.findOne({_id:paramId}).select('-password');
    if(!single_user) {
      return res.status(404).json({status:'Failed',message:"User not found"})
    };
    return res.status(200).json({status:'Success', data:single_user})
  } catch (error) {
    console.log('error',error)
  }
};





const getAllUser = async(req,res) => {
  try {
    const allusers = await User.find({}).exec();
    return res.status(200).json({status:'Success',data:allusers})
  } catch (error) {
    console.log('error',error)
  }
};

const updateUser = async (req,res) => {
  try {
     const paramId = req.params.id;
    if(!mongoose.isValidObjectId(paramId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    const bodyd = req.body;
    if(bodyd?.password) {
      bodyd.password = await bcrypt.hashSync(bodyd.password, Number(process.env.SALT_ROUND))
    }
    const new_updateuser = await User.findByIdAndUpdate(paramId,bodyd,{new:true,runValidators:true});
    if(!new_updateuser) {
      return res.status(401).json({status:"Failed",message:"User not found"})
    };
    return res.status(200).json({status:'Success',message:"User updated successfully.", data:new_updateuser})
  } catch (error) {
    console.log('error',error)
  }
};

const deleteUser = async(req,res) => {
  try {
    const paramId = req.params.id;
    if(!mongoose.isValidObjectId(paramId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    const removeduser = await User.findByIdAndDelete(paramId);
    if(!removeduser) {
       return res.status(200).json({status:'Failed', message:"Usre not found."})
    }
    return res.status(200).json({status:'Success', message:"User deleted successfully."})
  } catch (error) {
    console.log('error',error)
  }
}

module.exports = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  getSingleUser
};
