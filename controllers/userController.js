const { userService } = require('../services')

module.exports = {
  createNewUser: async (req, res) => {
    try {
        await userService.create(req.body)
        req.flash('alertMessage', 'Success Crate user');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/user');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/user');
    }
  },
  editUser: async (req, res) => {
    try {
      await userService.edit(req.body)
      req.flash('alertMessage', 'Success Edit user');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/user');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect(`/admin/user`);
    }
  }
}