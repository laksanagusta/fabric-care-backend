const Task = require("../../models/Task");

const createTask = async (req) => {
  const { taskFlow, taskStatus, taskNote, transaction, user } = req.body;
  const newTask = {
    taskFlow,
    taskStatus,
    taskNote,
    transaction,
    user
  };

  const task = await Task.create(newTask);
  return task;
};

module.exports = {
    createTask
}