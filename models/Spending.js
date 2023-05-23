const mongoose = require("mongoose");
const { Schema } = mongoose;

const spendingSchema = new Schema(
  {
    description: {
      type: String,
      required: true
    },
    grandTotal: {
      type: Number,
      required: true
    },
    user : {
        type: Schema.Types.Mixed,
        required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Spending", spendingSchema);
