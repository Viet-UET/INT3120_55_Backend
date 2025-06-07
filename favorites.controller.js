const Favorite = require('./favorite.model');

async function getFavorites(req, res) {
    const userId = req.user.userId;
    const favorites = await Favorite.find({ userId });
    res.json(favorites.map(fav => fav.articleData));
}

async function addFavorite(req, res) {
    const userId = req.user.userId;
    const { articleUrl, articleData } = req.body;

    const exists = await Favorite.findOne({ userId, articleUrl });
    if (exists) {
        return res.status(400).json({ message: 'Article already favorited.' });
    }

    const favorite = new Favorite({ userId, articleUrl, articleData });
    await favorite.save();
    res.json({ message: 'Article favorited successfully.' });
}

async function removeFavorite(req, res) {
    const userId = req.user.userId;
    const articleUrl = decodeURIComponent(req.params.articleUrlEncoded);

    await Favorite.deleteOne({ userId, articleUrl });
    res.json({ message: 'Article unfavorited successfully.' });
}

module.exports = { getFavorites, addFavorite, removeFavorite };
