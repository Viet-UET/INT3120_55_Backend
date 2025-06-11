const express = require('express');
const newsController = require('../controllers/news.controller');

const router = express.Router();

router.get('/top-headlines', newsController.getTopHeadlines);
router.get('/category/:category', newsController.getNewsByCategory);
router.get('/search', newsController.searchNews);

module.exports = router;
