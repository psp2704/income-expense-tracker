const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    fullname : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    accounts : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref: "Account"
    }],

    totalExpense : {
        type : Number
    },

    // totalIncome : {
    //     type : Number,
    //     required : true
    // },

    // totalBalance : {
    //     type : Number,
    //     required : true
    // }
}, {
    timestamps :true,
    toJSON : {virtuals : true}
});


const User = mongoose.model('User', userSchema);


module.exports = User;