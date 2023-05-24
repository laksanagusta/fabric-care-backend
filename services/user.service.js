const Branch = require("../models/Branch")
const User = require("../models/User")

module.exports = {
    create: async (user) => {
        const {name, username, password} = user
        const newUser = await User.create({
            name: name,
            username: username,
            password: password,
            role: "WORKER"
        })
        newUser.save()
    },
    edit: async (userReq) => {
        const {name, username, password, id, role, branchId} = userReq

        const userData = await User.findOne({ _id: id })

        const branch = await Branch.findOne({_id: branchId})

        if(userData){
            console.log("found")
            userData.name = name,
            userData.username = username,
            userData.password = password
            userData.role = role ?? "WORKER"
            userData.branch = {
                id : branch._id,
                name : branch.name
            }
            userData.save()
        }
    }
}