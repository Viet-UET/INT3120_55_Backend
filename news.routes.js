// src/routes/news.routes.js
const express = require('express');
const newsController = require('./news.controller');

const router = express.Router();

// Route cho tin tức nổi bật
router.get('/top-headlines', newsController.getTopHeadlines);

// Route cho tin tức theo danh mục
router.get('/category/:category', newsController.getNewsByCategory);

// Route cho tìm kiếm tin tức
router.get('/search', newsController.searchNews);

module.exports = router;