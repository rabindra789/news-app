const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// user logout route
router.post("/logout", logoutUser)

module.exports = router;
