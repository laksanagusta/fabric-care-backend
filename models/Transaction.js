const mongoose = require("mongoose");
const { transactionHelper } = require("../helper");
const { Schema } = mongoose;

const transactionService = new Schema({
  id: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  qty: {
    type: Number,
    required: false,
  },
  subtotal: {
    type: Number,
    required: false,
  },
  unit: {
    type: String,
    required: false,
  },
  unitPrice: {
    type: String,
    required: false,
  },
});

const transactionHistorySchema = new Schema(
  {
    id: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const transactionSchema = new Schema({
  orderNumber: {
    type: String,
    required: false,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  rack : {
    type: Schema.Types.Mixed,
    required: false
  },
  transactionFinishTime : {
    type: String,
    required: false
  },
  created_at : {
    type: String,
    required: false
  },
  transactionHistory: [transactionHistorySchema],
  service: [transactionService],
},{
  timestamps:true
});

// transactionSchema.pre('save', async function(next) {
//   const transaction = this;
//   transaction.transactionFinishTime = transactionHelper.addHours(transaction.updatedAt, 8);
// })

module.exports = mongoose.model("Transaction", transactionSchema);
