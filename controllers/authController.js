const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateToken = function (user){
  const payload = {user}
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {expiresIn:process.env.TOKEN_EXPIRY_TIME});
    return token;
}
const signup = async (req,res,next) => {
   try {
     const { firstname , lastname , email , password } = req.body;
     const user = await User.create({
       firstname,
       lastname,
       email,
       password,
      })
      user.password = undefined
      const generatedToken = generateToken(user)
      return res.status(200).json({
        status: "success",
        generatedToken,
        data:{user},
        })
   } catch (error) {
    return next(error)
   }
}
 const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if(!user) return next(new Error("can't find user!"));
    const checkPassword = user.isPasswordCorrect(password);
    if(!checkPassword) return next(new Error("incorrect password"))
    const token = generateToken(user)
    return res.status(200).json({
      status: "success",
      token,
      data: { user },
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  signup,
  signin
}