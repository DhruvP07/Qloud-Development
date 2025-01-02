const express = require('express');
const { handleUserSignup } = require('../controllers/users');

const router = express.Router()


router.post('/signup', handleUserSignup);

module.exports = router;