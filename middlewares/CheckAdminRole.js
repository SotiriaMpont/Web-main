const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");


const CheckModeratorRole = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, authConfig.secret);
        if (data.roles && data.roles.includes("admin"))
            return next();
    } catch { }
    return res.sendStatus(403);
};


module.exports = CheckModeratorRole;