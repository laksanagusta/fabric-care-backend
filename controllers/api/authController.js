const { userHelper } = require("../../helper");
const authService = require("../../services/api/auth.service");

module.exports = {
    signIn: async (req, res) => {
        try {
            const {username, password} = req.body;

            const data = await authService.signIn(username, password)
            
            res.status(200)
            res.json(data)

        } catch (error) {
            res.status(401)
            throw new Error(error)
        }
    },
}