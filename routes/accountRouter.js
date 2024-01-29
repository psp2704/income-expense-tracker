const express = require('express');
const { createAccount, allAccount, singleAccount, updateAccount, deleteAccount } = require('../controller/accountCtrl');

const accountRouter = express.Router();

//create account
accountRouter.post('/', createAccount);

//all account
accountRouter.get('/', allAccount);

//single account
accountRouter.get('/:id', singleAccount)

//update account
accountRouter.put('/:id', updateAccount)


accountRouter.delete('/:id', deleteAccount)



module.exports = accountRouter;