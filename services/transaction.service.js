const { transactionHelper, globalHelper } = require("../helper");
const { formatDate, yearValue } = require("../helper/transaction.helper");
const Rack = require("../models/Rack");
const Service = require("../models/Service");
const Transaction = require("../models/Transaction");
const { transactionRepository } = require("../repositories");

const createTransaction = async (req) => {
  const { customerName, grandTotal, service, branchId, user } = req.body;
  const newTransaction = {
    customerName,
    grandTotal,
    service: JSON.parse(service),
    status: "inbound",
    created_at: transactionHelper.formatDate(new Date()),
    branchId: branchId,
    user: user,
    transactionHistory: [
      {
        note: "Pesanan berhasil dibuat",
        status: "inbound",
      },
    ],
  };

  const transaction = await Transaction.create(newTransaction);
  return transaction;
};

const findById = async (id) => {
  const transaction = await Transaction.findById(id);
  return transaction;
};

const findByBranchId = async (locationId) => {
  if(!locationId){
    throw new Error(`Please send the location id`)
  }

  const transaction = await Transaction.find({
    locationId : locationId
  })

  return transaction
}

const addTransactionHistory = async (req) => {
  const { id, status, note } = req.body;

  const transaction = await Transaction.findOne({ _id: id });
  transaction.transactionHistory.push({
    note: note,
    status: status,
  });

  const newTransaction = await transaction.save();
  return newTransaction;
};

const updateTransaction = async (req) => {
  const { id, rackId, transactionHistory, status } = req.body;
  const transaction = await Transaction.findOne({ _id: id });

  if(rackId){
    const rackAssigned = await Rack.findOne({ _id: rackId });
    transaction.rack = rackAssigned;
  }

  if(transactionHistory){
    transaction.transactionHistory.push(transactionHistory)
  }

  if(status){
    if(status == "done") {
      transaction.transactionFinishTime = formatDate(new Date())
    }
    transaction.status = status
  }

  transaction.save();
};

const getRevenueYearly = async (year) => {  
  const startTime = formatDate(new Date(year + "-01-01 00:00:01"))
  const endTime = formatDate(new Date(year + "-12-31 23:59:59"))

  const yearlyRevenue = await Transaction.find({
    transactionFinishTime : {
      $gte : startTime,
      $lte : endTime
    }
  }, (error, data) => {
    if(error) throw error
    return data
  })

  const yearValues = yearValue();
  const grouping = {};
  yearlyRevenue.forEach((v) => {
    const month = v.transactionFinishTime.substring(5, 7)
    if(!grouping[yearValues[month]]){
      grouping[yearValues[month]] = v.grandTotal
    }else{
      grouping[yearValues[month]] += v.grandTotal
    }
  });

  return {
    grouping,
    yearValues
  }
};

const getReportPerService = async (startDate, endDate) => {
  const transaction = await transactionRepository.findTransactionByCreatedAtTimeRange(startDate, endDate)

  const grouping = {}
  transaction.forEach((v) => {
    v.service.forEach((s) => {
      if(!grouping[s._id]){
        grouping[s.id] = s.qty
      }else{
        grouping[s.id] += s.qty
      }
    })
  });

  const service = await Service.find().select({"name" : 1, "_id" : 1})

  let serviceMapping = {}
  service.forEach(items => {
    serviceMapping[items._id] = {
      name : items.name
    }
  })

  const label = [];
  const dataValue = [];
  const hexColor = [];

  Object.keys(grouping).forEach((key) => {
    label.push(serviceMapping[key].name)
    dataValue.push(grouping[key])
    hexColor.push(globalHelper.generateHexColor())
  });

  return {
    label,
    dataValue,
    hexColor
  }
}


module.exports = {
  createTransaction,
  findById,
  addTransactionHistory,
  updateTransaction,
  getRevenueYearly,
  getReportPerService,
  findByBranchId
};
