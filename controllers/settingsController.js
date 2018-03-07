const mongoose = require('mongoose');
const Settings = mongoose.model('Settings');
const Admin = mongoose.model('Admin');
const mail = require('../handlers/mail');
const crypto = require('crypto');

exports.addAdmin = async (req, res, next) => {
  console.log(req.body);
  const admin = await Admin.findOne({ email: req.body.email });
  if (admin) {
    req.flash('alert', 'Whoops, that person is already an admin');
    return res.redirect('/admin');
  } else {
    const token = crypto.randomBytes(20).toString('hex');
    const setting = new Settings({
      inviteAdminToken: token,
      inviteAdminExpires: Date.now() + 3600000, // 1 hour from now
      email: req.body.email
    }).save();

    const inviteURL = `http://${req.headers.host}/admin/register/${
      setting.inviteAdminToken
    }`;
    // await mail.send({
    //   admin,
    //   filename: 'invite-admin',
    //   subject: 'Featherweight CMS Admin invite',
    //   inviteURL
    // });
    req.flash(
      'success',
      `You have invited ${req.body.firstName} to be an admin`
    );
    res.redirect('/admin/');
  }
};
