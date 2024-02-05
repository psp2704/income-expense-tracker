const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },

    accountType : {
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
        ]
    },

    initialBalance : {
        type : Number,
        default : 0
    },

    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    transaction : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Transaction'
    },

    notes : {
        type : String,
        required : true
    }
}, {
    timestamps : true,
    toJSON : {virtuals : true}
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;