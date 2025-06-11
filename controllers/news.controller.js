// src/controllers/news.controller.js
const newsService = require('../services/news.service');

// Controller cho tin tức nổi bật
async function getTopHeadlines(req, res) {
    const { country = 'us', pageSize = 10, page = 1 } = req.query; // Lấy tham số từ query string

    try {
        const data = await newsService.getTopHeadlines(country, parseInt(pageSize), parseInt(page));
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
}

// Controller cho tin tức theo danh mục
async function getNewsByCategory(req, res) {
    const { category } = req.params; // Lấy danh mục từ URL parameter
    const { country = 'us', pageSize = 10, page = 1 } = req.query;

    const validCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
    if (category && !validCategories.includes(category.toLowerCase())) {
        return res.status(400).json({ message: 'Invalid category provided.' });
    }

    try {
        const data = await newsService.getNewsByCategory(category, country, parseInt(pageSize), parseInt(page));
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
}

// Controller cho tìm kiếm tin tức
async function searchNews(req, res) {
    const { q, pageSize = 10, page = 1, sortBy = 'publishedAt' } = req.query;

    if (!q) {
        return res.status(400).json({ message: 'Query parameter "q" is required for search.' });
    }

    try {
        const data = await newsService.searchNews(q, parseInt(pageSize), parseInt(page), sortBy);
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getTopHeadlines,
    getNewsByCategory,
    searchNews
};