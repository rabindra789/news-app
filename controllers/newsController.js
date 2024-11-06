const axios = require('axios');
const NewsArticle = require('../models/articleModel.js');

// Get personalized news feed based on user preferences
const getPersonalizedNewsFeed = async (req, res) => {
    const userId = req.user.id; 

    try {
        const userPreferences = await getUserPreferences(userId); 
        if (!userPreferences || !userPreferences.category) {
            return res.status(400).json({ error: 'User preferences are not set correctly.' });
        }

        const newsResponse = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: { 
                category: userPreferences.category, 
                apiKey: process.env.NEWS_API_KEY 
            }
        });

        const news = newsResponse.data.articles;
        if (!news || news.length === 0) {
            return res.status(404).json({ error: 'No news articles found.' });
        }

        return res.status(200).json({ news });
    } catch (err) {
        console.error('Error fetching personalized news:', err);
        return res.status(500).json({ error: 'Failed to fetch news, Please try again later.' });
    }
};

// Save an article for later
const saveArticle = async (req, res) => {
    const { articleId, title, content, url } = req.body;
    const userId = req.user.id;

    try {
        // Check if the article is already saved by this user
        const articleExists = await NewsArticle.findOne({ articleId, userId });
        if (articleExists) {
            return res.status(400).json({ error: 'Article already saved' });
        }

        // Save the article
        const newArticle = new NewsArticle({ articleId, userId, title, content, url });
        await newArticle.save();

        return res.status(201).json({ message: 'Article saved successfully' });
    } catch (err) {
        console.error('Error saving article:', err);
        return res.status(500).json({ error: 'Failed to save article, Please try again.' });
    }
};

// Get saved articles for the user
const getSavedArticles = async (req, res) => {
    const userId = req.user.id;

    try {
        // Fetch saved articles for this user
        const savedArticles = await NewsArticle.find({ userId });
        if (!savedArticles || savedArticles.length === 0) {
            return res.status(404).json({ error: 'No saved articles found.' });
        }

        return res.status(200).json({ savedArticles });
    } catch (err) {
        console.error('Error fetching saved articles:', err);
        return res.status(500).json({ error: 'Failed to fetch saved articles.' });
    }
};

module.exports = { getPersonalizedNewsFeed, saveArticle, getSavedArticles };
