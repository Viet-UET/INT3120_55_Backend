const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites.controller');
const authenticateJWT = require('../middlewares/auth.middleware');

router.get('/', authenticateJWT, favoritesController.getFavorites);
router.post('/', authenticateJWT, favoritesController.addFavorite);
router.delete('/:articleUrlEncoded', authenticateJWT, favoritesController.removeFavorite);

module.exports = router;
