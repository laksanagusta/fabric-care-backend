
const { transactionHelper, globalHelper } = require("../../helper");
const vars = require("../../config/vars");
const Branch = require("../../models/Branch");
const { transactionService } = require("../../services");

module.exports = {
    collectDashboardData: async (req, res) => {
        try {
            const { branchId } = req.body
            console.log("bramchId", branchId)
            const yearlyRevenueData =  await transactionService.getRevenueYearly()
            const years = transactionHelper.generateArrayOfYears()

            const date = new Date()
            const formatDate = await globalHelper.formatDateTimeRange(date, date)
            const dashboardData = await transactionService.getDashboardDaily(formatDate.startTime, formatDate.endTime, branchId)
            const branchs = await Branch.find()

            res.json({
                branchs: branchs,
                title: vars.appTitle,
                user: req.session.user,
                yearlyRevenueData,
                years,
                dashboardData : dashboardData
            })
            res.status(200)    
        } catch (error) {
            console.log(error.message)
            res.status(500)   
        }
    }
}

