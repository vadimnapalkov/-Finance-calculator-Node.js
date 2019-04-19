const User = require("../models/user");
const paymentsCategories = require("../models/paymentsCategories");
const incomingCategories = require("../models/incomingCategories");

exports.post = (req, res) => {
  const data = req.body.user;
  User.getByName(data.name).then(users => {
    if (users != null) {
      res.json();
    } else {
      User.save(data, (err, user) => {
        if (err) console.log(err);
        User.setUser(user, (err, users) => {
          if (err) console.log(err);
          id = String(users._id);
          paymentsCategories.addCategoryOther(id);
          incomingCategories.addCategoryOther(id);
          userResponse = { id: users._id, name: users.name };
          res.json(userResponse);
        });
      });
    }
  });
};
