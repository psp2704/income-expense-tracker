const express = require("express");
const {
  createTransaction,
  getSingleTransaction,
  allTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controller/transactionCtrl");
const { isLogin } = require("../middleware/isLogin");

// Create a router instance for handling transaction-related routes
const transactionRouter = express.Router();

// Endpoint to create a new transaction
transactionRouter.post("/", isLogin, createTransaction);

// Endpoint to get a single transaction by ID
transactionRouter.get("/:id", getSingleTransaction);

// Endpoint to get all transactions
transactionRouter.get("/", allTransaction);

// Endpoint to delete a transaction by ID
transactionRouter.delete("/:id", deleteTransaction);

// Endpoint to update a transaction by ID
transactionRouter.put("/:id", updateTransaction);

// Export the module for the transaction router
module.exports = transactionRouter;
