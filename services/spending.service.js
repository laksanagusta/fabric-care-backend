const { userHelper } = require("../helper");
const Spending = require("../models/Spending");

const getAllSpending = async (branchs) => {
  const services = await Spending.find({
    "branchId" : {
      "$in" : branchs
    }
  });
  return services;
};

const createSpending = async (req) => {
  const { description, grandTotal, branchId, user } = req;

  const newSpending = {
    description,
    grandTotal,
    user : user,
    branchId : branchId
  };

  await Spending.create(newSpending);
};

const updateSpending = async (req) => {
  const { description, grandTotal, id } = req;
  const spending = await Spending.findOne({ _id: id });
  spending.description = description;
  spending.grandTotal = grandTotal;
  spending.user = userHelper.getCurrentUserData(req);
  await spending.save();
};

module.exports = {
  createSpending,
  updateSpending,
  getAllSpending,
};
