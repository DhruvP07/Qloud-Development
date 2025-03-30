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

const mockUser = {
  email: "testuser@example.com",
  password: "TestPassword123",
  token: "mockToken123456",
};

// CORS middleware should be applied before defining routes
app.use(cors({
  origin: 'http://localhost:8081',  // Update this to match the origin of your React Native app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sign-in route
app.post('/user/auth/signin', (req, res) => {
  const { email, password } = req.body;

  if (email === mockUser.email && password === mockUser.password) {
    return res.json({
      status: 'success',
      token: mockUser.token,
    });
  }

  return res.json({
    status: 'failure',
    message: 'User does not exist',
  });
});

// MongoDB Connection
connectMongoDb(MONGO_URI)
  .then(() => console.log('connected to MongoDb'))
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
