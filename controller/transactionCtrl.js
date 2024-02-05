const Account = require("../model/accountSchema");
const Transaction = require("../model/transactionSchema");
const User = require("../model/userSchema");
const { appErr } = require("../utils/appErr");

//craete transaction
const createTransaction = async (req, res, next) => {
  try {
    const { name, transactionType, amount, category, notes, account } =
      req.body;

    const userFound = await User.findById(req.user);

    if (!userFound) {
      return next(appErr("user not found", 404));
    }

    const accountFound = await Account.findById(account);

    if (!userFound) {
      return next(appErr("account not found", 404));
    }

    const transacion = await Transaction.create({
      name,
      transactionType,
      amount,
      category,
      notes,
      account,
      createdBy : userFound._id
    });

    accountFound.push(transacion._id);

    await accountFound.save();

    res.send({ msg: "Success", data : transaction });
  } catch (error) {
    return next ( appErr(error.message, 401))
  }
};

//get transaction
const getSingleTransaction = async (req, res) => {
  try {
    res.send({ msg: "get the transaction" });
  } catch (error) {
    res.json(error);
  }
};

//get all  transaction
const allTransaction = async (req, res) => {
  try {
    res.send({ msg: "get all transaction" });
  } catch (error) {
    res.json(error);
  }
};

//update transaction
const updateTransaction = async (req, res) => {
  try {
    res.send({ msg: "update transacion" });
  } catch (error) {
    res.json(error);
  }
};

//delete transaction
const deleteTransaction = async (req, res) => {
  try {
    res.send({ msg: "delete transacion" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createTransaction,
  getSingleTransaction,
  allTransaction,
  deleteTransaction,
  updateTransaction,
};
