const express = require('express');
const { handleBusinessPersonSignup, handleBusinessPersonSignin, handleBusinessPersonforgotPassword, handlebusinessPersonResetPassword } = require('../controllers/businessControllers');

const router = express.Router()


router.post('/signup', handleBusinessPersonSignup);
router.post('/signin', handleBusinessPersonSignin);
router.post('/forgot-password', handleBusinessPersonforgotPassword);
router.post('/reset-password/:id/:token', handlebusinessPersonResetPassword);

module.exports = router;