const Branch = require("../models/Branch");

const getAllBranch = async () => {
    const branchs = await Branch.find();
    return branchs;
}

const createBranch = async (req) => {
    const {name} = req.body;
    const newBranch = {
        name
    }
    await Branch.create(newBranch);
}

const updateBranch = async (req) => {
    const {name, id} = req.body;
    const branch = await Branch.findOne({_id:id});
    branch.name = name;
    await branch.save();
}

module.exports = {
    createBranch,
    updateBranch,
    getAllBranch
};