require('dotenv').config(); // Ensure environment variables are loaded

const express = require('express');
const cors = require('cors');
const { connectMongoDb } = require('./connections');

// Routes
const userRouter = require('./routes/usersAuthenticationRoutes');
const businessRouter = require('./routes/businessAuthenticationRoutes');
const productRouter = require('./routes/productRoutes');
const productCategoryRouter = require('./routes/productCategoryRoutes');
const productSubCategoryRouter = require('./routes/productSubCategoryRoutes');
const userProfileRouter = require('./routes/userProfileRoutes');
const cartRouter = require('./routes/cartRoutes');
const userSelectRouter = require('./routes/userRoutes');
const questionRouter = require('./routes/questionRoutes');

const app = express();
const PORT = process.env.PORT || 8001; // Default to 8001 if the PORT is not defined
const MONGO_URI = process.env.MONGO_URI; // MongoDB URI


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB Connection
connectMongoDb('mongodb+srv://dhruvrp1703:DhruvPrajapati1731@qloud.lzryb.mongodb.net/Qloud')
    .then(() => console.log('connected to mongoDb'))
    .catch((err) => console.log('Error connecting to MongoDB', err));

// Routers
app.use('/user/auth', userRouter);
app.use('/user/profile', userProfileRouter);
app.use('/business/auth', businessRouter);
app.use('/business/user', userSelectRouter);
app.use('/business/questions', questionRouter);
app.use('/product-category', productCategoryRouter);
app.use('/product-sub-category', productSubCategoryRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

// Server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
