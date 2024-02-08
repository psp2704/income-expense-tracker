const User = require("../model/userSchema");
const { appErr } = require("../utils/appErr");
const Account = require("../model/accountSchema");

// Create account
const createAccount = async (req, res, next) => {
  try {
    const { name, accountType, initialBalance, notes } = req.body;
    
    // Find the user
    const userFound = await User.findById(req.user);
    
    if (!userFound) {
      return next(appErr('No user found', 401));
    }

    // Create the account
    const account = await Account.create({
      name,
      accountType,
      initialBalance,
      notes,
      createdBy: req.user
    });

    // Push the account into the user's accounts array
    userFound.accounts.push(account._id);
    
    // Save the updated user
    await userFound.save();
    
    res.json({ msg: 'Success', res: account });
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
    res.send({ msg: 'Success', data: accounts });
  } catch (error) {
    return next(appErr(error.message, 402));
  }
};

// Get single account
const singleAccount = async (req, res, next) => {
  try {
    const account = await Account.findById(req.params.id);
    res.send({ msg: 'Success', data: account });
  } catch (error) {
    return next(appErr(error.message, 402));
  }
};

// Update account
const updateAccount = async (req, res, next) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.send({ msg: 'Update Success', data: account });
  } catch (error) {
    return next(appErr(error.message, 402));
  }
};

// Delete account
const deleteAccount = async (req, res, next) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.send({ msg: 'Account Deleted Successfully' });
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
