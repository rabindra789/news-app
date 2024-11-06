const express = require('express');
const router = express.Router();
const {
    signup, login, logout, changePassword, getProfile, updateProfile
} = require('../controllers/userController.js');
const {
    getInterests, saveInterests, updateInterests
} = require('../controllers/interestController.js');
const {
    getNewsFeed
} = require('../controllers/newsController.js');
const {
    saveArticle, getSavedArticles, deleteArticle
} = require('../controllers/articleController.js');
const {jwtAuthMiddleware} = require('../middlewares/jwt.js');

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', jwtAuthMiddleware, logout);  // Correct usage

// Interest routes
router.get('/interests', jwtAuthMiddleware, getInterests);
router.post('/user/interests', jwtAuthMiddleware, saveInterests);
router.put('/user/interests', jwtAuthMiddleware, updateInterests);

// News feed route
router.get('/news-feed', jwtAuthMiddleware, getNewsFeed);

// Article routes
router.post('/user/articles', jwtAuthMiddleware, saveArticle);
router.get('/user/articles', jwtAuthMiddleware, getSavedArticles);
router.delete('/user/articles/:articleId', jwtAuthMiddleware, deleteArticle);

// Password and profile routes
router.put('/user/change-password', jwtAuthMiddleware, changePassword);
router.get('/user/profile', jwtAuthMiddleware, getProfile);
router.put('/user/profile', jwtAuthMiddleware, updateProfile);

module.exports = router;
