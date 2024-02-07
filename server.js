require('./config/dbConnect')
const express = require('express');
const userRouter = require('./routes/userRouter');
const transactionRouter = require('./routes/transactionRouter');
const accountRouter = require('./routes/accountRouter');
const globalErrorHandler = require('./middleware/globalErrorHnadler');

const app = express();
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/accounts', accountRouter);
app.use('/api/v1/transactions' , transactionRouter)
//middlewares

//routes

app.get('/', async (req, res)=>{
    try {
       res.send('hello to people of the earth') 
    } catch (error) {
        console.log(error)
    }
})

//user
//user register

//accouts

//transaction

//error handling    
app.use(globalErrorHandler)
//listen to the server

const PORT = process.env.PORT || 7000;
app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
})