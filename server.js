// Import các thư viện cần thiết
require('dotenv').config(); // Nạp các biến môi trường từ file .env
const express = require('express');
const axios = require('axios');

// Khởi tạo ứng dụng Express
const app = express();
const PORT = process.env.PORT || 3000; // Sử dụng PORT từ .env hoặc mặc định là 3000
const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

// Middleware để parse JSON requests (nếu frontend gửi dữ liệu JSON)
app.use(express.json());

// Kiểm tra xem API key đã được cấu hình chưa
if (!NEWSAPI_KEY) {
    console.error("Lỗi: NEWSAPI_KEY chưa được thiết lập trong file .env. Vui lòng thêm vào.");
    process.exit(1); // Thoát ứng dụng nếu không có API key
}

// Định nghĩa một endpoint để lấy tin tức
// Ví dụ: Lấy top headlines từ Việt Nam
app.get('/api/news', async (req, res) => {
    const country = req.query.country || 'vn'; // Lấy 'country' từ query params, mặc định là 'vn'
    const category = req.query.category || ''; // Lấy 'category' từ query params
    const q = req.query.q || ''; // Lấy 'q' (từ khóa tìm kiếm) từ query params
    const pageSize = req.query.pageSize || 20; // Số lượng bài viết mỗi trang
    const page = req.query.page || 1; // Trang hiện tại

    let apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${NEWSAPI_KEY}&pageSize=${pageSize}&page=${page}`;

    if (category) {
        apiUrl += `&category=${category}`;
    }

    if (q) {
        // Nếu có từ khóa tìm kiếm, chúng ta nên dùng endpoint /everything thay vì /top-headlines
        // Tuy nhiên, để đơn giản, ví dụ này vẫn dùng top-headlines và thêm q,
        // NewsAPI có thể không hỗ trợ 'q' với 'country'/'category' cùng lúc cho /top-headlines.
        // Bạn nên kiểm tra tài liệu NewsAPI để có cách sử dụng chính xác nhất.
        // Để tìm kiếm toàn diện, bạn nên dùng:
        // apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${NEWSAPI_KEY}&pageSize=${pageSize}&page=${page}`;
        // Và có thể thêm các tham số khác như language=vi, sortBy=publishedAt
        apiUrl += `&q=${encodeURIComponent(q)}`; // Mã hóa từ khóa tìm kiếm
    }


    try {
        console.log(`Đang gọi NewsAPI: ${apiUrl.replace(NEWSAPI_KEY, 'REDACTED_API_KEY')}`);
        const response = await axios.get(apiUrl);

        // NewsAPI trả về dữ liệu trong response.data
        // response.data có dạng: { status: "ok", totalResults: X, articles: [...] }
        if (response.data.status === "ok") {
            res.json(response.data); // Trả về toàn bộ object từ NewsAPI (bao gồm articles, totalResults)
        } else {
            // Xử lý các trường hợp lỗi từ NewsAPI (ví dụ: API key sai, quá giới hạn request)
            console.error("Lỗi từ NewsAPI:", response.data);
            res.status(500).json({ message: "Không thể lấy tin tức từ NewsAPI", error: response.data });
        }
    } catch (error) {
        console.error("Lỗi khi gọi NewsAPI:", error.response ? error.response.data : error.message);
        // error.response.data thường chứa thông tin lỗi chi tiết từ NewsAPI
        if (error.response) {
            res.status(error.response.status || 500).json({
                message: "Lỗi khi kết nối đến NewsAPI",
                error: error.response.data
            });
        } else {
            res.status(500).json({ message: "Lỗi máy chủ nội bộ", error: error.message });
        }
    }
});

// Endpoint ví dụ khác: Lấy tin tức theo danh mục cụ thể
app.get('/api/news/category/:categoryName', async (req, res) => {
    const categoryName = req.params.categoryName;
    const country = req.query.country || 'vn';
    const pageSize = req.query.pageSize || 20;
    const page = req.query.page || 1;

    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${categoryName}&apiKey=${NEWSAPI_KEY}&pageSize=${pageSize}&page=${page}`;

    try {
        console.log(`Đang gọi NewsAPI (category): ${apiUrl.replace(NEWSAPI_KEY, 'REDACTED_API_KEY')}`);
        const response = await axios.get(apiUrl);
        if (response.data.status === "ok") {
            res.json(response.data);
        } else {
            console.error("Lỗi từ NewsAPI:", response.data);
            res.status(500).json({ message: "Không thể lấy tin tức theo danh mục từ NewsAPI", error: response.data });
        }
    } catch (error) {
        console.error("Lỗi khi gọi NewsAPI (category):", error.response ? error.response.data : error.message);
        if (error.response) {
            res.status(error.response.status || 500).json({
                message: "Lỗi khi kết nối đến NewsAPI",
                error: error.response.data
            });
        } else {
            res.status(500).json({ message: "Lỗi máy chủ nội bộ", error: error.message });
        }
    }
});


// Khởi động server
app.listen(PORT, () => {
    console.log(`Backend server đang chạy tại http://localhost:${PORT}`);
    if (!NEWSAPI_KEY) {
        console.warn("Chú ý: NEWSAPI_KEY chưa được cấu hình. API sẽ không hoạt động.");
    }
});