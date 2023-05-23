const { taskService } = require("../../services");
const authService = require("../../services/api/auth.service");

module.exports = {
    createTask: async (req, res) => {
        try {
            const data = await taskService.createTask(req)
            
            res.status(200)
            res.json(data)
        } catch (error) {
            res.status(401)
            throw new Error(error)
        }
    },
}