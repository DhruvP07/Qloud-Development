console.log('Backend/index.js');
//Server
const express = require('express');

//Database
const mongoose = require('mongoose');
const {connectMongoDb} = require('./connections');

//Middlewares
const { checkForAuthentication, restrictTo } = require('./middlewares/authentication');

//Routes
const userRouter = require('./routes/usersAuthenticationRoutes');
const productRouter = require('./routes/productRoutes');
const productCategoryRouter = require('./routes/productCategoryRoutes');
const userProfileRouter = require('./routes/userProfileRoutes');

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
    .catch((err) => console.log('Error connecting to MongoDB', err));


//Routers
//User routes
app.use('/user/auth', userRouter);
app.use('/user/profile', restrictTo(['USER']), userProfileRouter);

//Product-category routes  -- Restricted to Admin
app.use("/product-category", productCategoryRouter);

//Product Routes    --- Restricted to Bsiness person
app.use("/product", productRouter);

app.listen(PORT, ()=>{console.log(`Server Started at port, ${PORT}`)});