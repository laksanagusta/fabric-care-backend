const fs = require('fs-extra')
const path = require('path')
const User = require('../models/User')

module.exports = {
    editUser: async (req, res) => {
        try {
          const { id, name, about, city } = req.body;
          const user = await User.findOne({ _id: id });
          if (req.file == undefined) {
            user.name = name;
            user.about = about;
            user.city = city;
            await user.save();
            req.flash('alertMessage', 'Success Update user');
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/user`);
          } else {
            if(user.image !== undefined)
            {
              await fs.unlink(path.join(`public/${user.image}`));
            }
            user.name = name;
            user.about = about;
            user.city = city;
            user.image = `images/${req.file.filename}`
            await user.save();
            req.flash('alertMessage', 'Success Update user');
            req.flash('alertStatus', 'success');
            res.redirect(`/admin/user`);
          }
        } catch (error) {
          req.flash('alertMessage', `${error.message}`);
          req.flash('alertStatus', 'danger');
          res.redirect(`/admin/user`);
        }
      },
}