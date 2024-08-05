const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch news' });
  }
});

module.exports = router;
