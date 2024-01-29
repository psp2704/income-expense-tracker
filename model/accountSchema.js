const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },

    accountType : {
        type : String,
        enum : [
            "Svaing",
            "Travel"
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

module.exportss = Account;