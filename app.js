const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/news.routes');
const authRoutes = require('./routes/auth.routes');
const favoritesRoutes = require('./routes/favorites.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'API Endpoint not found.' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server!' });
});

module.exports = app;
