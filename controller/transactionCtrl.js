const Account = require("../model/accountSchema");
const Transaction = require("../model/transactionSchema");
const User = require("../model/userSchema");
const { appErr } = require("../utils/appErr");

//craete transaction
const createTransaction = async (req, res, next) => {
  try {
    const { name, transactionType, amount, category, notes, account } =
      req.body;

    //1 find the user
    const userFound = await User.findById(req.user);
    if (!userFound) {
      return next(appErr("user not found", 402));
    }

    //2. find the account
    const accountFound = await Account.findById(account);
    if (!accountFound) {
      return next(appErr("account not found", 402));
    }

    const transaction = await Transaction.create({
      name,
      transactionType,
      amount,
      category,
      notes,
      account,
      createdBy: req.user,
    });

    //3 pust  the transaction into accout 
    accountFound.transactionData.push(transaction._id);

    //4 save the account
    accountFound.save();

    res.json({
      status : "success",
      transaction : transaction
    })
  } catch (error) {
    return next(appErr(error.message, 404));
  }
};

//get transaction
const getSingleTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
    res.json({ status: "success", data : transaction });
  } catch (error) {
    return next(appErr(error.message, 402));
  }
};

//get all  transaction
const allTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById()
    res.json({ status: "success", transaction : transaction });
  } catch (error) {
    return next(appErr(error.message, 402));
  }
};

//update transaction
const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new : true,
      runValidators : true
    })
    res.json({ status: "success", transaction : transaction });
  } catch (error) {
    return next(appErr(error.message, 402));
  }
};

//delete transaction
const deleteTransaction = async (req, res, next) => {
  try {

    // Find the transaction and remove it from the database
    const transaction = await Transaction.findById(req.params.id);

    // Find the account that contains the deleted transaction
    const accountWithTransaction = await Account.findOne({ transactions: req.params.transactionId });

    // Filter out the deleted transaction from the account's transactionData array
    const filterTransactionsAccount = accountWithTransaction.transactionData.filter(transact => transact.toString() !== req.params.id.toString());

    // Update the account's transactionData with the filtered array
    accountWithTransaction.transactionData = [...filterTransactionsAccount];

    // Save the updated account
    await accountWithTransaction.save();

    // Send a JSON response indicating success along with the updated account
    res.json({ status: "success",  account: req.params.transactionId, data : req.params.id });
  } catch (error) {
    // Handle errors and pass them to the error handling middleware
    return next(appErr(error.message, 402));
  }
};


module.exports = {
  createTransaction,
  getSingleTransaction, 
  allTransaction,
  deleteTransaction,
  updateTransaction,
};
