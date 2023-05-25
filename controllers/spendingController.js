const Spending = require('../models/Spending')
const { spendingService } = require('../services')

module.exports = {
    addSpending: async (req, res) => {
        try {
            req.body.branchId = req.session.user.branchs[0].id
            req.body.user = req.session.user
            await spendingService.createSpending(req.body);
            req.flash('alertMessage', 'Success Add Spending')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/spending');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/spending');
        }
    },
    editSpending: async (req, res) => {
        try {
            await spendingService.updateSpending(req);
            req.flash('alertMessage', 'Success Update Spending')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/spending');            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/spending');            
        }
    },
    deleteSpending: async (req, res) => {
        try {
            const {id} = req.params;
            const spending = await Spending.findOne({ _id : id});
            await spending.remove();
            req.flash('alertMessage', 'Success Delete Spending')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/spending') 
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/spending');            
        }
    },
}