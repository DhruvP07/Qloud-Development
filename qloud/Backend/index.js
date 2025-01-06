console.log('Backend/index.js');
//Server
const express = require('express');

//Database
const mongoose = require('mongoose');
const {connectMongoDb} = require('./connections');

//Middlewares
const { checkForAuthentication, restrictTo } = require('./middlewares/authentication');

//Routes
const userRouter = require('./routes/usersAuthenticationRoute');
const userProfileRouter = require('./routes/userProfileRoute');

//Server
const app = express();
PORT = 7000;


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(checkForAuthentication);


//MongoDB Connection
connectMongoDb('mongodb+srv://dhruvrp1703:DhruvPrajapati1731@qloud.lzryb.mongodb.net/Qloud')
    .then(() => console.log('connected to mongoDb'))
    .catch((err) => console.log('Error connecting to MongoDB', err))


//Routers
app.use('/user/auth', userRouter);
app.use('/user/profile', restrictTo(['USER']), userProfileRouter);

app.listen(PORT, ()=>{console.log(`Server Started at port, ${PORT}`)})