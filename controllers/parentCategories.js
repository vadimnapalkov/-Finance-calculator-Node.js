const idOtherUsers = require("../controllers/idOtherUsers");
const payment = require("../controllers/payments");

BuildCategory = (name, userId) => {
  let category = { name: name, userId: userId };
  return category;
};

UpdatePayment = (id, description) => {
  payment.findCategory(id, description).then(values => {
    if (values.length != 0) {
      idOtherUsers.get(values[0].userId, description).then(item => {
        values.forEach(value => {
          payment.update(value.id, item[0].otherId);
        });
      });
    }
  });
};

class parentCategories {
  Categories() {
    return new Error();
  }

  description() {
    return new Error();
  }
  static add(name, userId, cb) {
    let category = BuildCategory(name, userId);
    this.Categories()
      .create(category)
      .then(item => {
        cb(item);
      });
  }

  static addCategoryOther(userId) {
    let baseСategory = "Other";
    let category = BuildCategory(baseСategory, userId);
    let description = this.description();
    this.Categories()
      .create(category)
      .then(item => {
        idOtherUsers.set(userId, item.dataValues.id, description);
      });
  }

  static all(userId) {
    return this.Categories().findAll({
      where: { userId: userId },
      order: ["createdAt"]
    });
  }

  static find(name, userId) {
    this.Categories()
      .findAll({ where: { userId: userId, name: name } })
      .then(item => {
        cb(item.dataValues);
      });
  }

  static update(id, newname) {
    return this.Categories().update({ name: newname }, { where: { id: id } });
  }

  static delete(id) {
    let description = this.description();
    UpdatePayment(id, description);
    return this.Categories().destroy({ where: { id: id } });
  }
}

module.exports = parentCategories;
