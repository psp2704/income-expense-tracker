//create account
const createAccount =  async (req, res)=>{
    try {
        res.send({msg : 'create account'})
    } catch (error) {
        res.json(error)
    }
};

//get all account
const allAccount = async (req, res)=>{
    try {
        res.send({msg : 'all account'})
    } catch (error) {
        res.json(error)
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




