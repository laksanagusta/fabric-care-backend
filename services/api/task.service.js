const { transactionService } = require("..");
const Task = require("../../models/Task");

const getAllTask = async () => {
  const task = await Task.find();
  return task;
};

const createTask = async (req) => {
  const { taskFlow, taskStatus, taskNote, transaction, user } = req;

  const parseTransaction = JSON.parse(transaction)
  
  const newTask = {
    taskFlow,
    taskStatus,
    taskNote,
    transaction : parseTransaction,
    user
  };

  if(transaction){
    parseTransaction.forEach(value => {
      const transactionHistory = {
        note : `Transaksi berhasil melewati task ${taskFlow}`,
        status : value.status
      }

      const dataReq = { 
        body : {
          transactionHistory,
          id : value.id,
          status : value.status
        }
      }

      transactionService.updateTransaction(dataReq)
    });
  }

  const task = await Task.create(newTask);
  return task;
};

module.exports = {
    createTask,
    getAllTask
}