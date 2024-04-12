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
    res.send({ status: 'success', data: accounts });
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
// Define an asynchronous function to handle the deletion of an account
const deleteAccount = async (req, res, next) => {
  try {
    // Attempt to find and delete the account using the provided ID
    await Account.findByIdAndDelete(req.params.id);

    // Find a user who has the deleted account in their accounts array
    const userWithTransactionId = await User.findOne({ accounts : { $in: [req.params.id] } });

    // Filter out the deleted account ID from the user's accounts array
    const filterUserAccounts = userWithTransactionId.accounts.filter(accId => accId.toString() !== req.params.id.toString());

    // Update the user's accounts array with the filtered IDs
    userWithTransactionId.accounts = [...filterUserAccounts];

    // Save the updated user object
    userWithTransactionId.save();

    // Respond with a success message and the updated user object
    res.json({status : 'success', user : userWithTransactionId });
  } catch (error) {
    // If an error occurs during the deletion process, pass it to the error handling middleware
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
