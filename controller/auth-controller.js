const { validationResult } = require("express-validator");
const User = require("../schema/user-schema");
const bcrypt = require('bcrypt');
const { matchPassword, tokenCreate } = require("../middleware/service-middleware");
const cloudinary = require('../middleware/service-middleware')
const AuthRegister = async(req,res) => {
  console.log('createUser',11)
      try {
        const { fullName, email, password, role, status } = req.body;
        console.log('reqFile',fullName,req.file);

        if(!email || !email.endsWith('@aispl.co')) {
          return res.status(403).json({status:"Failed",message:"Registration is restricted to authorized aispl.co email addresses."})
        };
        const uploadResult = await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: 'users'
          }
        );
        console.log('uploadResult',uploadResult)
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
          role,
          userImg:uploadResult.secure_url,
          password: hashPassword,
          status,
        });

        console.log('newUser',newUser)
    
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

const AuthLogin = async (req, res) => {
  console.log('dd',2)
  try {
    const { email, password } = req.body;
    const checkuser = await User.findOne({ email: email });
    if (!checkuser) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }

    const checkPassword = await matchPassword(password, checkuser.password);
    console.log('checkPassword',checkPassword)
    if (!checkPassword) {
      return res
        .status(401)
        .json({ status: "Failed", message: "Invalid email and password" });
    }

    const token = await tokenCreate({
      _id: checkuser._id,
      email: checkuser.email,
    });

    return res.status(200).json({status:"Success", message:"User logged in successfully", token,data : checkuser})
  } catch (error) {
    return res.status(500).json({status:'Failed', message:"Internal server error"})
    console.log("error", error);
  }
};

const AuthMe = async (req,res) => {
  try {
    const loggedInuser = req["user"]; 
    return res.status(200).json({status:'Success',data:loggedInuser})
  } catch (error) {
    console.log('error',error)
  }
};

module.exports = {
    AuthRegister,
    AuthLogin,
    AuthMe
}