const User = require("../controllers/user");
const passport = require("passport");

exports.post = (req, res, next) => {
  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }
      if (passportUser) {
        const user = passportUser;
        return res.json(User.toJson(user));
      }
      return res.json();
    }
  )(req, res, next);
};

exports.all = (req, res) => {
  User.all(users => {
    if (users) {
      res.json(users);
    } else {
      res.json();
    }
  });
};
