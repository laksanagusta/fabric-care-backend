const Transaction = require("../models/Transaction")

const findTransactionByCreatedAtTimeRange = async (startTime, endTime) => {
    const transaction = await Transaction.find({
      created_at : {
        $gte : startTime,
        $lte : endTime
      }
    }, (error, data) => {
      if(error) throw error
      return data
    })

    return transaction
}

module.exports = {
    findTransactionByCreatedAtTimeRange
}