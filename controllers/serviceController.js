const Service = require('../models/Service')
const { serviceService } = require('../services')

module.exports = {
    addService: async (req, res) => {
        try {
            await serviceService.createService(req);
            req.flash('alertMessage', 'Success Add Service')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/service');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/service');
        }
    },
    editService: async (req, res) => {
        try {
            await serviceService.updateService(req);
            req.flash('alertMessage', 'Success Update Service')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/service');            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/service');            
        }
    },
    deleteService: async (req, res) => {
        try {
            const {id} = req.params;
            const service = await Service.findOne({ _id : id});
            await service.remove();
            req.flash('alertMessage', 'Success Delete Service')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/service') 
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/service');            
        }
    },
}