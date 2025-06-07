const express = require('express');
const router = express.Router();
const favoritesController = require('./favorites.controller');
const authenticateJWT = require('./auth.middleware');

router.get('/', authenticateJWT, favoritesController.getFavorites);
router.post('/', authenticateJWT, favoritesController.addFavorite);
router.delete('/:articleUrlEncoded', authenticateJWT, favoritesController.removeFavorite);

module.exports = router;
