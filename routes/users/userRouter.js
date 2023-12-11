const express = require("express");
const {
  userRegister,
  userLogin,
  getUserProfile,
  updateUser,
  deleteUser,
} = require("../../controller/users/userCtrl");

const userRouter = express.Router();

//user register
userRouter.post("/register", userRegister);

//user login
userRouter.post("/login", userLogin);

//get single user profile
userRouter.get("/profile/:id", getUserProfile);

//update user
userRouter.put("/:id", updateUser);

//delete user
userRouter.delete("/:id", deleteUser);


//export the module for the user router
module.exports = userRouter;
