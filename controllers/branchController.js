const Branch = require('../models/Branch')
const { branchService } = require('../services')

module.exports = {
    addBranch: async (req, res) => {
        try {
            await branchService.createBranch(req);
            req.flash('alertMessage', 'Success Add Branch')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/branch');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/branch');
        }
    },
    editBranch: async (req, res) => {
        try {
            await branchService.updateBranch(req);
            req.flash('alertMessage', 'Success Update Branch')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/branch');            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/branch');            
        }
    },
    deleteBranch: async (req, res) => {
        try {
            const {id} = req.params;
            const service = await Branch.findOne({ _id : id});
            await service.remove();
            req.flash('alertMessage', 'Success Delete Branch')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/branch') 
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/branch');            
        }
    },
}