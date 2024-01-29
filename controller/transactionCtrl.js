
//craete transaction
const createTransaction = async (req, res)=>{
    try {
        res.send({msg : 'create transaction'})
    } catch (error) {
        res.json(error)
    }
};

//get transaction
const getSingleTransaction = async (req, res)=>{
    try {
        res.send({msg : 'get the transaction'})
    } catch (error) {
        res.json(error)
    }
}

//get all  transaction
const allTransaction = async (req, res)=>{
    try {
        res.send({msg : 'get all transaction'})
    } catch (error) {
        res.json(error)
    }
};

//update transaction
const updateTransaction = async (req, res)=>{
    try {
        res.send({msg : 'update transacion'})
    } catch (error) {
        res.json(error)
    }
};

//delete transaction 
const deleteTransaction = async (req, res)=>{
    try {
        res.send({msg : 'delete transacion'})
    } catch (error) {
        res.json(error)
    }
};

module.exports = {
    createTransaction,
    getSingleTransaction,
    allTransaction,
    deleteTransaction,
    updateTransaction,
}