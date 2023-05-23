const jwt = require("jsonwebtoken");
const vars = require("../config/vars");
const User = require("../models/User");

const authJWT = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, vars.jwtSecret)

            req.user = await User.findById(decoded.id)

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('not autohorized, token failed')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
}
  
module.exports = { 
    authJWT
};