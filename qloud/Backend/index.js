console.log('Backend/index.js');
const express = require('express');
const mongoose = require('mongoose');
const {connectMongoDb} = require('./connections');
const userRouter = require('./routes/users');


//Server
const app = express();
PORT = 7000;


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


//MongoDB Connection
connectMongoDb('mongodb://localhost:27017/Qloud')
    .then(() => console.log('connected to mongoDb'))
    .catch((err) => console.log('Error connecting to MongoDB', err))


//Routers
app.use('/user', userRouter);

app.listen(PORT, ()=>{console.log(`Server Started at port, ${PORT}`)})