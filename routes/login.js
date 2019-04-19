const User = require("../models/user");

exports.post = (req, res, next) => {
  const data = req.body.user;
  User.authenticate(data, (err, user) => {
    if (err) return next(err);
    if (user) {
      userResponse = { id: user._id, name: user.name };
      res.json(userResponse);
    } else {
      res.json();
    }
  });
};
