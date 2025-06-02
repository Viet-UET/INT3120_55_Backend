// src/app.js
const express = require('express');
const cors = require('cors'); // Import cors middleware
const newsRoutes = require('./news.routes');

const app = express();

// Middleware để cho phép CORS (Cross-Origin Resource Sharing)
// Điều này rất quan trọng để frontend (chạy trên một cổng khác) có thể gọi backend
app.use(cors());

// Middleware để phân tích cú pháp JSON từ request body
app.use(express.json());

// Định nghĩa các route cho API tin tức
// Tất cả các route trong newsRoutes sẽ có tiền tố /api/news
app.use('/api/news', newsRoutes);

// Xử lý các route không tìm thấy (404 Not Found)
app.use((req, res, next) => {
    res.status(404).json({ message: 'API Endpoint not found.' });
});

// Xử lý lỗi chung (Error Handler)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server!' });
});

module.exports = app;