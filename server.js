// src/server.js
require('dotenv').config(); // Tải biến môi trường từ file .env
const app = require('./app');

// Lấy PORT từ biến môi trường hoặc dùng mặc định là 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access API at http://localhost:${PORT}/api/news`);
});