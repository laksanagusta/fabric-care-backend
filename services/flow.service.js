const Flow = require("../models/Flow");

const getAllFlow = async () => {
  const flows = await Flow.find();
  return flows;
};

const createFlow = async (req) => {
  const { name, code } = req.body;
  const newFlow = {
    name,
    code
  };
  await Flow.create(newFlow);
};

const updateFlow = async (req) => {
  const { name, code, id } = req.body;
  const flow = await Flow.findOne({ _id: id });
  flow.name = name;
  flow.code = code.toLowerCase();
  await flow.save();
};

module.exports = {
  createFlow,
  updateFlow,
  getAllFlow,
};
