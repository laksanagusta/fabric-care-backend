const Task = require('../models/Task')
const { taskService } = require('../services')

module.exports = {
    addTask: async (req, res) => {
        try {
            await taskService.createTask(req);
            req.flash('alertMessage', 'Success Add Task')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/task');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/task');
        }
    },
    editTask: async (req, res) => {
        try {
            await taskService.updateTask(req);
            req.flash('alertMessage', 'Success Update Task')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/task');            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/task');            
        }
    },
    deleteTask: async (req, res) => {
        try {
            const {id} = req.params;
            const service = await Task.findOne({ _id : id});
            await service.remove();
            req.flash('alertMessage', 'Success Delete Task')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/task') 
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/task');            
        }
    },
}