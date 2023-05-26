const User = require("../../models/User");
const { taskService } = require("../../services");

module.exports = {
    createTask: async (req, res) => {
        try {
            const user = await User.findOne({_id : req.body.user})
            req.body.user = {
                id : user._id,
                name : user.name
            }
            console.log(req.body)
            const data = await taskService.createTask(req.body)
            
            res.status(200)
            res.json(data)
        } catch (error) {
            res.status(401)
            throw new Error(error)
        }
    },
}