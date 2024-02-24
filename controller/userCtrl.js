const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");
const { appErr } = require("../utils/appErr");
const { generateToken } = require("../utils/generateToken");

// User registration
const userRegister = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if the user already exists
    const userFound = await User.findOne({ email });

    if (userFound) {
      return next(appErr("User Already Exist", 400));
    }

    // Check if required fields are provided
    if (!fullname || !email || !password) {
      return next(appErr("All fields are required", 400));
    }

    // Hash the password before storing in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Create a new user
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
    return next(appErr(error.message, 500));
  }
};

// User login
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if required fields are provided
    if (!email || !password) {
      return next(appErr("All fields are required", 400));
    }

    // Find the user by email
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return next(appErr("Invalid Login Credentials", 400));
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      return next(appErr("Invalid Login Credentials", 400));
    }

    // Generate and return a token upon successful login
    return res.json({ id: userFound._id, status: "success", token: generateToken(userFound._id) });
  } catch (error) {
    console.log(error);
    return next(appErr(error.message, 400));
  }
};

// Get single user profile
const getUserProfile = async (req, res) => {
  try {
    // Retrieve user profile using the provided token
    const user = await User.findById(req.user).populate({
      path : 'accounts',
      populate : {
        path : 'transactionData',
        model : 'Transaction'
      }
    });
    res.json({ status: "success",  userData: user });
  } catch (error) {
    console.log(error);
  }
};

// Update the user
const updateUser = async (req, res, next) => {
  try {
    // Get the user by ID
    const userFound = await User.findById(req.user);
    if (!userFound) {
      return next(appErr('Invalid user request', 400));
    }

    //check if email exist or not
    if(req.body.email) {
      const userEmail = userFound.email;

      const userExists = await User.find({email : req.body.email});
      if(userEmail === req.body.email || !userExists){
        return next(appErr('Email already exists' , 400))
      }
    }

    // Update password if provided
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      const user = await User.findByIdAndUpdate(req.user, {
        password: hashedPass,
      }, {
        new: true,
        runValidators: true
      });

      return res.json({ msg: 'Success', data: user });
    }

    // Update user data
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true
    });

    return res.json({ msg: "Success", data: user });

  } catch (error) {
    return next(appErr(error.message , 400)); // Pass error to error handling middleware
  }
};


// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({
      msg : 'Success',
      data : user
    })
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
