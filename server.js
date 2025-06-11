// src/server.js
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Access API at http://localhost:${PORT}/api/news`);
    });
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
});
