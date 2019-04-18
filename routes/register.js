const User = require("../models/user");
const Pay = require("../models/categoriespay");
const Inc = require("../models/categoriesinc");

exports.submit = (req, res) => {
  const data = req.body.user;
  User.User.getByName(data.name).then(users => {
    if (users != null) {
      res.json();
    } else {
      User.User.save(data, (err, user) => {
        User.User.setUser(user).then(() => {
          User.User.getByName(data.name).then(users => {
            id = String(users._id);
            Pay.Category.add("Other", id);
            Inc.Category.add("Other", id);
            userres = { id: user._id, name: user.name };
            res.json(userres);
          });
        });
      });
    }
  });
};
