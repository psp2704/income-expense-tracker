const mongoose = require('mongoose');

const dbConnect = async () =>{
    try {
        await mongoose.connect("mongodb+srv://psp:xQe8hXhlQff36M9T@blog-application.9jfjbyh.mongodb.net/income-expense-tracker?retryWrites=true&w=majority");
        console.log('DB connected')
    } catch (error) {
        console.log(`conection failed ${error.message}`);
        process.exit(1);
    }
}

dbConnect();