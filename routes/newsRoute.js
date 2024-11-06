const express = require('express');
const router = express.Router();
const { getPersonalizedNewsFeed, saveArticle, getSavedArticles } = require('../controllers/newsController');

// GET route for personalized news feed
router.get('/news', getPersonalizedNewsFeed);

// POST route to save an article
router.post('/save-article', saveArticle);

// GET route to fetch saved articles
router.get('/saved-articles', getSavedArticles);

module.exports = router;
