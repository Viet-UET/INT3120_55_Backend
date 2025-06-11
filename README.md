#  News API Server

Một RESTful API backend cho ứng dụng đọc tin tức, cung cấp:

✅ Lấy tin tức mới nhất từ NewsAPI  
✅ Lọc theo danh mục  
✅ Tìm kiếm bài viết  
✅ Đăng nhập bằng Google OAuth2  
✅ Lưu bài viết yêu thích (favorites) cho từng người dùng  

##  Công nghệ sử dụng

- **Ngôn ngữ**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: Google OAuth 2.0 + JWT
- **3rd party API**: [NewsAPI.org](https://newsapi.org)
- **Khác**: Axios, dotenv, cors

##  Cài đặt và chạy dự án

### Yêu cầu

- Node.js >= 14
- MongoDB 

### Cài đặt

```bash
git clone <repo-url>
cd <project-folder>
npm install
