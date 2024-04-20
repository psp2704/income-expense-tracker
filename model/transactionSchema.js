const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    name : {
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

    color : {
        type : String,
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

      notes : {
        type : String,
        required : true
    }
}, {
    timestamps : true,
    toJSON : {virtuals : true}
});


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;