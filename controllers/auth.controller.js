const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyIdToken(idToken) {
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    return payload;
}

async function googleLogin(req, res) {
    const { idToken } = req.body;
    if (!idToken) {
        return res.status(400).json({ message: 'Missing idToken' });
    }

    try {
        const payload = await verifyIdToken(idToken);

        const tokenPayload = {
            userId: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            token,
            user: tokenPayload
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid Google ID token' });
    }
}

module.exports = {
    googleLogin
};
