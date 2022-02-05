const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, authConfig.secret);
        req.userId = data.id;
        //req.userRole = data.role;
        return next();
    } catch (ex) {
        console.log(ex)
        return res.sendStatus(403);
    }
};

module.exports = authorization;