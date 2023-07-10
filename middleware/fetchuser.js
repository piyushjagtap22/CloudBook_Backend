const jwt = require('jsonwebtoken')
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

const fetchuser = async (req, res, next) => {
    try {
        //Get the user from the jwt token and add User to req object
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ error: 'Please authenticate using a valid token' });
        }
        const data = await jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'Please authenticate using a valid token' });
    }
};

module.exports = fetchuser;