const { transactionService } = require("../../services")

module.exports = {
    findById: async (req, res) => {
        try {
            const { transactionId } = req.params
            const transaction = await transactionService.findById(transactionId)

            if(!transaction){
                res.status(200).json({
                    success : false,
                    message : "Transaction not found",
                    transaction
                })
            }

            res.status(200).json({
                success : true,
                message : "Success get transaction",
                transaction
            })
        } catch (error) {
            console.log(error.message)
        }
    },
}