const Article = require('../models/articleModel.js');

const saveArticle = async (req, res) => {
    try {
        const article = new Article({ ...req.body, userId: req.user.id });
        await article.save();
        res.status(201).json({ message: 'Article saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save article' });
    }
};

const getSavedArticles = async (req, res) => {
    try {
        const articles = await Article.find({ userId: req.user.id });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch saved articles' });
    }
};

const deleteArticle = async (req, res) => {
    try {
        await Article.deleteOne({ _id: req.params.articleId, userId: req.user.id });
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete article' });
    }
};

module.exports = { saveArticle, getSavedArticles, deleteArticle };
