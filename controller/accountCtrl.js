const User = require("../model/userSchema");
const { appErr } = require("../utils/appErr");
const Account = require("../model/accountSchema");

// Create account
const createAccount = async (req, res, next) => {
  try {
    const { accountName, accountType, initialBalance, notes } = req.body;
    
    // check for input fields
    if (!(accountName && accountType && initialBalance && notes)){
      return next(appErr("All fields are Required", 400))
    }


    // Find the user
    const userFound = await User.findById(req.user);
    
    if (!userFound) {
      return next(appErr('No user found', 401));
    }

    // Create the account
    const account = await Account.create({
      accountName,
      accountType,
      initialBalance,
      notes,
      createdBy: req.user 
    });

    // Push the account into the user's accounts array
    userFound.accounts.push(account._id);
    
    // Save the updated user
    await userFound.save();
    
    res.json({ status: 'success', account: account });
  } catch (error) {
    return next(appErr(error.message, 401));
  }
};

// Get all accounts
const allAccount = async (req, res, next) => {
  try {
    const accounts = await Account.find({}).populate({
      path: 'transactionData'
    });
    res.send({ status: 'Success', data: accounts });
  } catch (error) {
    return next(appErr(error.message, 402));
  }
};

// Get single account
const singleAccount = async (req, res, next) => {
  try {
    const account = await Account.findById(req.params.id).populate({
      path : 'transactionData',
      populate : {
        path : 'createdBy',
        model : 'User'
      }
    });

    res.json({ status: 'success', account: account });
  } catch (error) {
    return next(appErr(error.message, 400));
  }
};

// Update account
const updateAccount = async (req, res, next) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.send({ status: "success", data: account });
  } catch (error) {
    return next(appErr(error.message, 402));
  }
};

// Delete account
const deleteAccount = async (req, res, next) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.send({ status: "success" });
  } catch (error) {
    return next(appErr(error.message, 402));
  }
};

module.exports = {
  createAccount,
  allAccount,
  singleAccount,
  updateAccount,
  deleteAccount,
};
