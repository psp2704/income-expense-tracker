const express = require('express');
const userRouter = require('./routes/user/userRouter');

const app = express();

//middlewares

//routes
app.get('/', async (req, res) =>{
    try {
        res.send('Hey! This is the node environment that we are using.')
    } catch (error) {
        console.log(error)
    }
});

//user    

app.use('/api/v1/users', userRouter);

//accouts

//transaction

//error handling    

//listen to the server

const PORT = process.env.PORT || 7000;
app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
})