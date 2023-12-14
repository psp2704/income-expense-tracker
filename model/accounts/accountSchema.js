const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

});


const Account = mongoose.model('Account', accountSchema);

module.exportss = Account;