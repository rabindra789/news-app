const axios = require('axios');

const getNewsFeed = async (req, res) => {
    const { category } = req.query;
    const userInterests = req.user.interests;

    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${category || userInterests}&apiKey=${process.env.NEWS_API_KEY}`);
        res.json(response.data.articles);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch news feed' });
    }
};

module.exports = { getNewsFeed };
