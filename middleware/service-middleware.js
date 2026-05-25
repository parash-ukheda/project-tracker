const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require('node:path');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
  destination:function(req,file,cb) {
    cb(null, path.join(__dirname, '../upload'))
  },
  filename:function(req,file,cb) {
     const safeName = file.originalname.replace(/\s+/g, '-');
     console.log('safeName',safeName,file)
    // console.log('ddddddddddd',file,req.file);
    req["file"] = file;
     cb(null, safeName);
  }
})

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key : process.env.API_KEY,
  api_secret:process.env.API_SECRET,
  secure:true
})

const tokenCreate = async (payload) => {
  const token = await jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

const matchPassword = async (password, hashpassword) => {
  const checkpsw = await bcrypt.compareSync(password, hashpassword);
  return checkpsw;
};

const AuthorizeRole = (allowedRoles) => {
  
  return (req,res,next) => {
    if(!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ status:"Failed",message: "Forbidden: You do not have the required role" });
    };
    next();
  }
};
const upload =  multer({storage:storage})

module.exports = {
  tokenCreate,
  matchPassword,
  AuthorizeRole,
  cloudinary,
  upload
};
