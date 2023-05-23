const Flow = require('../models/Flow')
const { flowService } = require('../services')

module.exports = {
    addFlow: async (req, res) => {
        try {
            await flowService.createFlow(req);
            req.flash('alertMessage', 'Success Add Flow')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/flow');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/flow');
        }
    },
    editFlow: async (req, res) => {
        try {
            await flowService.updateFlow(req);
            req.flash('alertMessage', 'Success Update Flow')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/flow');            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/flow');            
        }
    },
    deleteFlow: async (req, res) => {
        try {
            const {id} = req.params;
            const service = await Flow.findOne({ _id : id});
            await service.remove();
            req.flash('alertMessage', 'Success Delete Flow')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/flow') 
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/flow');            
        }
    },
}