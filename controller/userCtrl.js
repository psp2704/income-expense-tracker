const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");
const { appErr } = require("../utils/appErr");
const { generateToken } = require("../utils/generateToken");

const userRegister = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound) {
      // return res.status(400).json({
      //   msg: 'User already exists'
      // });
      // return next(new Error('User Already Exist000'))
      return next(appErr("User Already Exist000", 400));
    }

    if (!fullname || !email || !password) {
      // return res.status(400).json({
      //   msg: 'All fields are required'
      // });
      return next(appErr("All fields are required", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullname,
      email,
      password: hashedPass,
    });

    return res.json({
      msg: "Success",
      id: user._id,
    });
  } catch (error) {
    // return res.status(500).json({
    //   error: error.message
    // });
    return next(appErr(error.message, 500));
  }
};

//user login
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // return res.status(400).json({
      //   msg: 'All fields are required'
      // });
      // return next(new Error('All fields are required'))
      return next(appErr("All fields are required", 400));
    }

    const userFound = await User.findOne({ email });

    if (!userFound) {
      // return res.status(400).json({
      //   msg: 'Invalid Login Credentials - User not found'
      // });
      // return next(new Error('Invalid Login Credentials - User not found'))
      return next(appErr("Invalid Login Credentials - User not found", 400));
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      // return res.status(400).json({
      //   msg: 'Invalid Login Credentials - Incorrect password'
      // });
      // return next(new Error('Invalid Login Credentials - Incorrect password'))
      return next(
        appErr("Invalid Login Credentials - Incorrect password", 400)
      );
    }

    return res.json(
      { 
        msg: "User logged in successfully",
        token : generateToken(userFound._id)
      });
  } catch (error) {
    console.log(error);
    // return res.status(500).json({
    //   error: error.message
    // });
    return next(appErr(error.message, 400));
  }
};

//get single user profile
const getUserProfile = async (req, res) => {
  try {
    res.send({ msg: "get the user" });
  } catch (error) {
    console.log(error);
  }
};

// update the user
const updateUser = async (req, res) => {
  try {
    res.send({ msg: "find/update the user" });
  } catch (error) {
    console.log(error);
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    res.send({ msg: "delete the user" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
  getUserProfile,
  updateUser,
  deleteUser,
};
