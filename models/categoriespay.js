const Value = require("./value");
const db = require("../db.js");
const { ObjectID } = require("mongodb");

module.exports.Category = {
  add(name, userid) {
    let category = { name: name, userId: userid };
    return db
      .get()
      .collection("categoriespay")
      .insertOne(category, { w: 1 });
  },

  all(userid) {
    return db
      .get()
      .collection("categoriespay")
      .find({ userId: userid })
      .toArray();
  },
  find(name, userid) {
    return db
      .get()
      .collection("categoriespay")
      .findOne({ userId: userid, name: name });
  },

  update(_id, newname, name, userid) {
    Value.Value.find(userid, name, "pay").then(values => {
      if (values.length != 0) {
        values.forEach(value => {
          Value.Value.updatename(value._id, newname);
        });
      }
    });
    if (typeof _id !== "object") _id = ObjectID(_id);
    return db
      .get()
      .collection("categoriespay")
      .update({ _id }, { $set: { name: newname } });
  },

  delete(_id, name, userid) {
    Value.Value.find(userid, name, "pay").then(values => {
      if (values.length != 0) {
        values.forEach(value => {
          Value.Value.update(value._id);
        });
      }
    });
    if (typeof _id !== "object") _id = ObjectID(_id);
    return db
      .get()
      .collection("categoriespay")
      .deleteOne({ _id }, { w: 1 });
  }
};
