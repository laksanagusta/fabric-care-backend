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

  console.log(newFlow)
  await Flow.create(newFlow);
};

const updateFlow = async (req) => {
  const { name, code } = req.body;
  const flow = await Flow.findOne({ _id: id });
  flow.name = name;
  flow.code = code;
  flow.capacity = capacity;
  await flow.save();
};

module.exports = {
  createFlow,
  updateFlow,
  getAllFlow,
};
