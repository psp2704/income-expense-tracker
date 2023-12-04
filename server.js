const express = require('express');
// const userRouter = require('./routes/users/userRouter');

const app = express();

//middlewares

//routes

//user
//user register
app.post('/api/v1/users/register', async (req, res) =>{
    try {
        res.send({msg : "user register"})
    } catch (error) {
        console.log(error)
    }
});


//user login
app.post('/api/v1/users/login', async (req, res) =>{
    try {
        res.send({msg : "user login"})
    } catch (error) {
        console.log(error)
    }
});

//user profile
app.get('/api/v1/users/profile/:id', async (req, res) =>{
    try {
        res.send({msg : "get the user"})
    } catch (error) {
        console.log(error)
    }
});

//update user
app.put('/api/v1/users/:id', async (req, res) =>{
    try {
        res.send({msg : "find/update the user"})
    } catch (error) {
        console.log(error)
    }
});

//delete user
app.delete('/api/v1/users/:id', async (req, res) =>{
    try {
        res.send({msg : "delete the user"})
    } catch (error) {
        console.log(error)
    }
});


//accouts

//create account
app.post('/api/v1/accounts', async (req, res)=>{
    try {
        res.send({msg : 'create account'})
    } catch (error) {
        res.json(error)
    }
});

//all account
app.get('/api/v1/accounts', async (req, res)=>{
    try {
        res.send({msg : 'all account'})
    } catch (error) {
        res.json(error)
    }
});

//single account
app.get('/api/v1/accounts/:id', async (req, res)=>{
    try {
        res.send({msg : 'find account'})
    } catch (error) {
        res.json(error)
    }
})

//update account
app.put('/api/v1/accounts/:id', async (req, res)=>{
    try {
        res.send({msg : 'find/update account'})
    } catch (error) {
        res.json(error)
    }
})


app.delete('/api/v1/accounts/:id', async (req, res)=>{
    try {
        res.send({msg : 'delete account'})
    } catch (error) {
        res.json(error)
    }
})



//transaction

//create transaction
app.post('/api/v1/transactions', async (req, res)=>{
    try {
        res.send({msg : 'create transaction'})
    } catch (error) {
        res.json(error)
    }
})

//get transaction
app.get('/api/v1/transactions/:id', async (req, res)=>{
    try {
        res.send({msg : 'get the transaction'})
    } catch (error) {
        res.json(error)
    }
});

//get all  transaction
app.get('/api/v1/transactions', async (req, res)=>{
    try {
        res.send({msg : 'get all transaction'})
    } catch (error) {
        res.json(error)
    }
})

//delete transaction
app.delete('/api/v1/transactions/:id', async (req, res)=>{
    try {
        res.send({msg : 'delete transacion'})
    } catch (error) {
        res.json(error)
    }
});


//update transaction
app.put('/api/v1/transactions/:id', async (req, res)=>{
    try {
        res.send({msg : 'update transacion'})
    } catch (error) {
        res.json(error)
    }
})



//error handling    

//listen to the server

const PORT = process.env.PORT || 7000;
app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
})