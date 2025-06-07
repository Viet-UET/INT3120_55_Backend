const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Google sub
    articleUrl: { type: String, required: true },
    articleData: { type: Object }, // Lưu dữ liệu bài viết lúc Like
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
