const express = require("express");
const {
  createTransaction,
  getSingleTransaction,
  allTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controller/transactionCtrl");

const transactionRouter = express.Router();

//create transaction
transactionRouter.post("/", createTransaction);

//get transaction
transactionRouter.get("/:id", getSingleTransaction);

//get all  transaction
transactionRouter.get("/", allTransaction);

//delete transaction
transactionRouter.delete("/:id", deleteTransaction);

//update transaction
transactionRouter.put("/:id", updateTransaction);

module.exports = transactionRouter;
