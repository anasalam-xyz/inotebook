const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    //Get user from the jwt token and add ID to request object
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send("Access Denied!");
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch(err) {
        res.status(401).send("Access Denied!");
    }
}

module.exports = fetchuser;