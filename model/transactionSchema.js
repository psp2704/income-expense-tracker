const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    transactName : {
        type : String,
        required : true
    },

    transactionType : {
        type : String,
        enum : [
            "Expense",
            "Income"
        ],
        required : true
    },

    amount : {
        type : Number,
        default : 0,
        
    },

    category : {
        type : String,
        enum : [
            "Saving",
            "Travel",
            "Investment",
            "Checking",
            "Building",
            "School",
            "Utilities",
            "Loan",
            "Cash",
            "Groceries"
        ],
        required : true
    },

    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    date : {
        type : Date,
        default : Date.now()
    },
    
    account : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required : true
    }
}, {
    timestamps : true,
    toJSON : {virtuals : true}
});


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;