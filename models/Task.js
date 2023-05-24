const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true
  }
});

const taskSchema = new Schema({
  taskFlow: {
    type: String,
    required: true,
  },
  taskStatus: {
    type: String,
    required: true,
  },
  taskNote: {
    type: String,
    required: false,
  },
  transaction : [transactionSchema],
  user: {
    type: Schema.Types.Mixed,
    required: false
  },
  created_at : {
    type: String,
    required: false
  }
},{
  timestamps:true
});

module.exports = mongoose.model("Task", taskSchema);
