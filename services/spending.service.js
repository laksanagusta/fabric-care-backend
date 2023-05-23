const { userHelper } = require("../helper");
const Spending = require("../models/Spending");

const getAllSpending = async () => {
  const services = await Spending.find();
  return services;
};

const createSpending = async (req) => {
  const { description, grandTotal } = req.body;

  const newSpending = {
    description,
    grandTotal,
    user : userHelper.getCurrentUserData(req),
  };

  await Spending.create(newSpending);
};

const updateSpending = async (req) => {
  const { description, grandTotal, id } = req.body;
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
