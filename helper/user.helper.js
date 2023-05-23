const jwt = require("jsonwebtoken")
const vars = require("../config/vars")

const getCurrentUserData = (req) => {
    return req.session.user
}

const generateToken = (userId) => {
    return jwt.sign({userId}, vars.jwtSecret, {
        expiresIn: '30d'
    })
}

module.exports = {
    getCurrentUserData,
    generateToken
}