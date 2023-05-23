const Service = require("../models/Service");

const getAllService = async () => {
    const services = await Service.find();
    return services;
}

const createService = async (req) => {
    const {name, unitPrice, unit} = req.body;
    const newService = {
        name,
        unit,
        unitPrice
    }
    await Service.create(newService);
}

const updateService = async (req) => {
    const {name, id, unitPrice, unit} = req.body;
    const service = await Service.findOne({_id:id});
    service.name = name;
    service.unit = unit;
    service.unitPrice = unitPrice;
    await service.save();
}

module.exports = {
    createService,
    updateService,
    getAllService
};