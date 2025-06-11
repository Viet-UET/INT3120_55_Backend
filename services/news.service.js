// src/services/news.service.js
const axios = require('axios');
// Đảm bảo biến môi trường được tải
// Trong môi trường development, bạn sẽ gọi dotenv.config() trong server.js
// hoặc app.js. Ở đây chỉ để mô phỏng việc truy cập biến.
// const NEWS_API_KEY = process.env.NEWS_API_KEY; // Sẽ được tải từ app.js
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Hàm lấy các bài báo nổi bật
async function getTopHeadlines(country = 'us', pageSize = 10, page = 1) {
    try {
        // Lấy API Key từ biến môi trường
        const NEWS_API_KEY = process.env.NEWS_API_KEY;
        if (!NEWS_API_KEY) {
            throw new Error('NEWS_API_KEY is not defined in environment variables.');
        }

        const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
            params: {
                apiKey: NEWS_API_KEY,
                country: country,
                pageSize: pageSize,
                page: page
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching top headlines:', error.message);
        // Ném lỗi để controller có thể bắt và gửi về client
        throw new Error('Failed to fetch top headlines from NewsAPI');
    }
}

// Hàm lấy tin tức theo danh mục
async function getNewsByCategory(category, country = 'us', pageSize = 10, page = 1) {
    try {
        const NEWS_API_KEY = process.env.NEWS_API_KEY;
        if (!NEWS_API_KEY) {
            throw new Error('NEWS_API_KEY is not defined in environment variables.');
        }

        const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
            params: {
                apiKey: NEWS_API_KEY,
                country: country,
                category: category,
                pageSize: pageSize,
                page: page
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching news for category ${category}:`, error.message);
        throw new Error(`Failed to fetch news for category ${category} from NewsAPI`);
    }
}

// Hàm tìm kiếm tin tức theo từ khóa
async function searchNews(query, pageSize = 10, page = 1, sortBy = 'publishedAt') {
    try {
        const NEWS_API_KEY = process.env.NEWS_API_KEY;
        if (!NEWS_API_KEY) {
            throw new Error('NEWS_API_KEY is not defined in environment variables.');
        }

        const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
            params: {
                apiKey: NEWS_API_KEY,
                q: query,
                pageSize: pageSize,
                page: page,
                sortBy: sortBy // relevancy, popularity, publishedAt
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error searching news for query "${query}":`, error.message);
        throw new Error(`Failed to search news for query "${query}" from NewsAPI`);
    }
}

module.exports = {
    getTopHeadlines,
    getNewsByCategory,
    searchNews
};