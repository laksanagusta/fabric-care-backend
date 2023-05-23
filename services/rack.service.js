const Rack = require("../models/Rack");

const getAllRack = async () => {
  const racks = await Rack.find();
  return racks;
};

const createRack = async (req) => {
  const { name, code, capacity } = req.body;
  const newRack = {
    name,
    code,
    capacity,
  };
  await Rack.create(newRack);
};

const updateRack = async (req) => {
  const { name, code, capacity, id } = req.body;
  const rack = await Rack.findOne({ _id: id });
  rack.name = name;
  rack.code = code;
  rack.capacity = capacity;
  await rack.save();
};

module.exports = {
  createRack,
  updateRack,
  getAllRack,
};
