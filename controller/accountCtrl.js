const User = require("../model/userSchema");
const { appErr } = require("../utils/appErr");
const Account = require("../model/accountSchema");

//create account
const createAccount =  async (req, res, next)=>{
    try {
        const  {name, accountType, initialBalance, notes} = req.body;
        //1 find user
        const userFound = await User.findById(req.user);

        if(!userFound){
           return next(appErr('No user found', 401))
        }

        //2 create accout
        const account = await Account.create({
            name,
            accountType,
            initialBalance,
            notes,
            createdBy : req.user
        });
            
        //3 push the account in the user
         userFound.accounts.push(account._id);

         //4 resave the user
         await userFound.save();
        
        res.json({msg : 'success', res : account})
    } catch (error) {
        return next(appErr(error.message, 401))
    }
};

//get all account
const allAccount = async (req, res)=>{
    try {
        const accounts = await Account.find({}).populate({
            path : 'transactionData'
        });
        res.send({msg : 'Success', data : accounts,})
    } catch (error) {
        return next(appErr(error.message, 402))
    }
};


//get single account
const singleAccount = async (req, res)=>{
    try {
        res.send({msg : 'find account'})
    } catch (error) {
        res.json(error)
    }
};


//update account 
const updateAccount = async (req, res)=>{
    try {
        res.send({msg : 'find/update account'})
    } catch (error) {
        res.json(error)
    }
};


//delete account 
const deleteAccount = async (req, res)=>{
    try {
        res.send({msg : 'delete account'})
    } catch (error) {
        res.json(error)
    }
};

module.exports = {
    createAccount,
    allAccount,
    singleAccount,
    updateAccount, 
    deleteAccount,
}




