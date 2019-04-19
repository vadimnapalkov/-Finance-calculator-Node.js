const payment = require("./payments");
const { ObjectID } = require("mongodb");
const idOtherUsers = require("./idOtherUsers");

BuildCategory = (name, userId) => {
  let category = { name: name, userId: userId };
  return category;
};

UpdatePayment = (id, description) => {
  payment.findCategory(id, description).then(values => {
    if (values.length != 0) {
      idOtherUsers.get(value[0].userId, description).then(idOther => {
        values.forEach(value => {
          payment.update(value._id, idOther);
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
    return this.Categories().insertOne(category, (err, response) => {
      if (err) cb(err);
      else cb(null, response.ops[0]);
    });
  }

  static addCategoryOther(userId) {
    let baseСategory = "Other";
    let category = BuildCategory(baseСategory, userId);
    let description = this.description();
    this.Categories().insertOne(category, function(err, response) {
      if (err) console.log("Error occurred while inserting");
      else idOtherUsers.set(userId, response.ops[0]._id, description);
    });
  }

  static all(userId) {
    return this.Categories()
      .find({ userId: userId })
      .toArray();
  }

  static find(name, userId) {
    return this.Categories().findOne({ userId: userId, name: name });
  }

  static update(_id, newname) {
    if (typeof _id !== "object") _id = ObjectID(_id);
    return this.Categories().update({ _id }, { $set: { name: newname } });
  }

  static delete(_id) {
    let description = this.description();
    UpdatePayment(_id, description);
    if (typeof _id !== "object") _id = ObjectID(_id);
    return this.Categories().deleteOne({ _id });
  }
}

module.exports = parentCategories;
