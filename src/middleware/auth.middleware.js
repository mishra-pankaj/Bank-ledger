const userModel = require('../models/user.models');
const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: "Token is missing",
            status: "failed"
        });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        });
        const user = await userModel.findById(decoded.userId);

        req.user = user;
        return next();

    }
    catch(err){
        return res.status(401).json({
            message: "Unauthorized acces ,Token is invalid",
            status: "failed"
        });
        
    }

}

module.exports = authMiddleware;
