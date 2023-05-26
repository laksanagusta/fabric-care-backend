const { transactionHelper } = require('../helper');
const { monthLabel, formatDate } = require('../helper/transaction.helper');
const Transaction = require('../models/Transaction');
const { transactionService, rackService } = require('../services');

module.exports = {
    addTransaction: async (req, res) => {
        try {
            req.body.branchId = req.session.user.branchs[0].id
            req.body.user = req.session.user
            const transaction = await transactionService.createTransaction(req);
            res.status(200).json({
                message : "Success save transaction",
                transaction
            })
        } catch (error) {
            res.status(500).json({
                message : error.message,
            })
        }
    },
    editTransaction: async (req, res) => {
        try {
            req.body.user = req.session.user
            transactionService.updateTransaction(req);
            req.flash('alertMessage', 'Success Update Transaction')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/transaction');            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/transaction');            
        }
    },
    deleteTransaction: async (req, res) => {
        try {
            const {id} = req.params;
            const transaction = await Transaction.findOne({ _id : id});
            await transaction.remove();
            req.flash('alertMessage', 'Success Delete Transaction')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/transaction') 
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/transaction');            
        }
    },
    transactionDetail: async (req, res) => {
        try {
            const { transactionId } = req.params;
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status : alertStatus};

            const transaction = await transactionService.findById(transactionId);
            const rack = await rackService.getAllRack()
            const statusColor = transactionHelper.getStatusColor(transaction.status);

            res.render('admin/transaction/v_detail_transaction', {
              title: "Excel",
              alert,
              transactionId,
              transaction,
              rack,
              statusColor,
              user: req.session.user
          });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect(`/admin/transaction/${transactionId}`);            
        }
    },
    addTransactionHistory: async (req, res) => {
        try {
            const transaction = await transactionService.addTransactionHistory(req);
            res.status(200).json({
                message : "Success save transaction",
                transaction
            })
        } catch (error) {
            res.status(500).json({
                message : error.message,
            })
        }
    },
    revenueChartYearly: async (req, res) => {
        try {
            const data = await transactionService.getRevenueYearly(req.body.year);
            const monthLabels = monthLabel()
            res.status(200).json({
                message : "Success",
                revenueYearlyData : data,
                monthLabels
            })
        } catch (error) {
            res.status(500).json({
                message : error.message,
            })
        }
    },
    reportPerServiceCurrentDate: async (req, res) => {
        try {
            const startTime = formatDate(new Date())
            const endTime = formatDate(new Date())

            const data = await transactionService.getReportPerService(startTime.slice(0, 10) + " 00:00:00", endTime.slice(0, 10) + " 23:59:59");

            res.status(200).json({
                message : "Success",
                reportPerServiceCurrentDate : data
            })
        } catch (error) {
            res.status(500).json({
                message : error.message,
            })
        }
    }
}