const jwt = require('jsonwebtoken')
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

const fetchuser = async (req, res, next) => {
    try {
        //Get the user from the jwt token and add User to req object

        console.log('fetchuser')
        const token = req.get('Authorization')
        console.log(token)
        console.log(req.get('authorization'))
        if (!token) {
            console.log('!token')
            return res.status(401).json({ error: 'Please authenticate using a valid token' });
        }
        const jwtSecret = req.originalUrl.includes('refresh') ? JWT_REFRESH_SECRET : JWT_SECRET
        jwt.verify(token.split(' ')[1], jwtSecret, (err, data) => {
            console.log('dd')
            console.log(data)
            if (err && err?.name === 'TokenExpiredError') return res.status(403).send('Token expired')
            if (err) return res.status(401).send('Invalid Token')
            req.user = data.user;
            console.log(data.user)
            console.log('fetchuserend')
            next();
        })

    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'Please authenticate using a valid token' });
    }
};

module.exports = fetchuser;