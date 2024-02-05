const express = require("express");
const {
  userRegister,
  userLogin,
  getUserProfile,
  updateUser,
  deleteUser,
} = require('../controller/userCtrl');
const { isLogin } = require("../middleware/isLogin");

// Create a router instance for handling user-related routes
const userRouter = express.Router();

// Endpoint for user registration
userRouter.post("/register", userRegister);

// Endpoint for user login, with authentication middleware (isLogin)
userRouter.post("/login", isLogin, userLogin);

// Endpoint to get a single user's profile, with authentication middleware (isLogin)
userRouter.get("/profile", isLogin, getUserProfile);

// Endpoint to update a user's information
userRouter.put("/:id", updateUser);

// Endpoint to delete a user
userRouter.delete("/:id", deleteUser);

// Export the module for the user router
module.exports = userRouter;
