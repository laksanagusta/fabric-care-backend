const Rack = require('../models/Rack')
const { rackService } = require('../services')

module.exports = {
    addRack: async (req, res) => {
        try {
            await rackService.createRack(req);
            req.flash('alertMessage', 'Success Add Rack')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/rack');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/rack');
        }
    },
    editRack: async (req, res) => {
        try {
            await rackService.updateRack(req);
            req.flash('alertMessage', 'Success Update Rack')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/rack');            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/rack');            
        }
    },
    deleteRack: async (req, res) => {
        try {
            const {id} = req.params;
            const service = await Rack.findOne({ _id : id});
            await service.remove();
            req.flash('alertMessage', 'Success Delete Rack')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/rack') 
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/rack');            
        }
    },
}