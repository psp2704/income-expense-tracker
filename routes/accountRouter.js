const express = require('express');
const { createAccount, allAccount, singleAccount, updateAccount, deleteAccount } = require('../controller/accountCtrl');
const { isLogin } = require('../middleware/isLogin');

// Create a router instance for handling account-related routes
const accountRouter = express.Router();

// Endpoint to create a new account
accountRouter.post('/',isLogin, createAccount);

// Endpoint to get all accounts
accountRouter.get('/',isLogin, allAccount);

// Endpoint to get a single account by ID
accountRouter.get('/:id',isLogin, singleAccount);

// Endpoint to update an account by ID
accountRouter.put('/:id',isLogin, updateAccount);

// Endpoint to delete an account by ID
accountRouter.delete('/:id',isLogin, deleteAccount);

// Export the module for the account router
module.exports = accountRouter;