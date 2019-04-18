const User = require("../models/user");

exports.submit = (req, res, next) => {
  const data = req.body.user;
  User.User.authenticate(data, (err, user) => {
    if (err) return next(err);
    if (user) {
      userres = { id: user._id, name: user.name };
      res.json(userres);
    } else {
      res.json();
    }
  });
};
