const { transactionHelper, globalHelper } = require("../helper");
const { formatDate, yearValue } = require("../helper/transaction.helper");
const Rack = require("../models/Rack");
const Transaction = require("../models/Transaction");
const { transactionRepository } = require("../repositories");

const createTransaction = async (req) => {
  const { customerName, grandTotal, service, branchId, user } = req.body;
  const newTransaction = {
    customerName,
    grandTotal,
    weightTotal: 0,
    service: JSON.parse(service),
    status: "ongoing",
    created_at: transactionHelper.formatDate(new Date()),
    branchId: branchId,
    user: user,
    transactionHistory: [
      {
        note: `Pesanan berhasil dibuat oleh ${user.name}`,
        status: "ongoing",
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

const findByBranchId = async (branchIds) => {
  const transaction = await Transaction.find({
    branchId: {
      $in: branchIds,
    },
  });

  return transaction;
};

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
  const { id, rackId, transactionHistory, status, user } = req.body;
  const transaction = await Transaction.findOne({ _id: id });

  if (rackId) {
    const rackAssigned = await Rack.findOne({ _id: rackId });
    transaction.rack = rackAssigned;
  }

  if (transactionHistory) {
    transaction.transactionHistory.push(transactionHistory);
  }

  if (status) {
    if (status == "done") {
      transaction.transactionHistory.push({
        note: `Pesanan berhasil selesai oleh ${user.name}`,
        status: status,
      });
      transaction.transactionFinishTime = transactionHelper.formatDate(new Date());
    }
    transaction.status = status;
  }

  transaction.save();
};

const getRevenueYearly = async (year) => {
  const startTime = formatDate(new Date(year + "-01-01 00:00:01"));
  const endTime = formatDate(new Date(year + "-12-31 23:59:59"));

  const yearlyRevenue = await Transaction.find(
    {
      transactionFinishTime: {
        $gte: startTime,
        $lte: endTime,
      },
    },
    (error, data) => {
      if (error) throw error;
      return data;
    }
  );

  const yearValues = yearValue();
  const grouping = {};
  yearlyRevenue.forEach((v) => {
    const month = v.transactionFinishTime.substring(5, 7);
    if (!grouping[yearValues[month]]) {
      grouping[yearValues[month]] = v.grandTotal;
    } else {
      grouping[yearValues[month]] += v.grandTotal;
    }
  });

  return {
    grouping,
    yearValues,
  };
};

const getReportPerService = async (startDate, endDate) => {
  const transaction =
    await transactionRepository.findTransactionByCreatedAtTimeRange(
      startDate,
      endDate
    );

  const grouping = {};
  transaction.forEach((v) => {
    v.service.forEach((s) => {
      if (!grouping[s.name]) {
        grouping[s.name] = {
          qty: s.qty,
          name: s.name,
        };
      } else {
        grouping[s.name]["qty"] += s.qty;
      }
    });
  });

  const label = [];
  const dataValue = [];
  const hexColor = [];

  Object.keys(grouping).forEach((key) => {
    label.push(grouping[key].name);
    dataValue.push(grouping[key].qty);
    hexColor.push(globalHelper.generateHexColor());
  });

  return {
    label,
    dataValue,
    hexColor,
  };
};

const transactionDynamicQuery = async (customQuery) => {
  const transactions = await Transaction.find(customQuery.find).select(customQuery.select);
  return transactions;
};

const getDashboardDaily = async (startTime, endTime, branchId) => {
  const transactions = await transactionDynamicQuery({
    find : {
      "$or" : [
        {
          transactionFinishTime : {
            "$gte" : startTime,
            "$lte" : endTime
          }
        },
        {
          created_at : {
            "$gte" : startTime,
            "$lte" : endTime
          }
        },
        {
          status: "ongoing"
        }
      ],
      branchId : branchId
    },
    select: {
      status: 1,
      created_at: 1,
      grandTotal: 1,
      transactionFinishTime: 1
    }
  })

  console.log(transactions)

  const transactionFinishedToday = await transactions.filter(transaction => 
    transaction.status == "done" && 
    transaction.transactionFinishTime >= startTime && 
    transaction.transactionFinishTime <= endTime
  )

  const transactionCreatedToday = await transactions.filter(transaction => 
    transaction.created_at >= startTime && 
    transaction.created_at <= endTime
  )

  const transactionOngoing = await transactions.filter(transaction => 
    transaction.status == "ongoing" 
  )

  const initialEarnings = 0;
  const earnings = await transactionFinishedToday.reduce(
    (accumulator, currentValue) =>
      accumulator.grandTotal + currentValue.grandTotal, initialEarnings
  );

  return {
    earnings: earnings,
    transactionCreatedToday: transactionCreatedToday.length,
    transactionFinishedToday: transactionFinishedToday.length,
    transactionOngoing: transactionOngoing.length
  };
};

module.exports = {
  createTransaction,
  findById,
  addTransactionHistory,
  updateTransaction,
  getRevenueYearly,
  getReportPerService,
  findByBranchId,
  getDashboardDaily,
  transactionDynamicQuery,
};
