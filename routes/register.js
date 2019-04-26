const User = require("../controllers/user");
const paymentsCategories = require("../controllers/paymentsCategories");
const incomingCategories = require("../controllers/incomingCategories");

exports.post = (req, res) => {
  const data = req.body.user;
  User.getByName(data.name, user => {
    if (user.length != 0) {
      res.json();
    } else {
      User.createUser(data, newUser => {
        paymentsCategories.addCategoryOther(newUser.dataValues.id);
        incomingCategories.addCategoryOther(newUser.dataValues.id);
        res.json(User.toJson(newUser.dataValues));
      });
    }
  });
};
