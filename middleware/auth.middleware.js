const jwt = require('jsonwebtoken');
const User = require('../schema/user-schema');

const authenTication = async (req, res, next) => {
  try {
    const headers = req.headers?.authorization;
    const token = headers?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ status: "Failed", message: "Token not found" });
    }

    await jwt.verify(token,process.env.SECRET_KEY, async(err,user) => {
      if (err) {
        return res
          .status(403)
          .json({ status: "Failed", message: "Token expired" });
      };
      
      let userFind = await User.findOne({_id:user._id}).select('-password');
      req.user = userFind;
      next();
    });
  } catch (error) {
    return res.status(403).json({ status: "Failed", message: "Invalid token" });
  }
};

module.exports = {
  authenTication,
};
