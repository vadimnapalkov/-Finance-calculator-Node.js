const db = require("../db.js");
const { ObjectID } = require("mongodb");

module.exports.Value = {
  add(val, userid, categoryname, categoryfunc) {
    var yesterday = new Date();
    var Datecreate = yesterday.getMonth() + 1 + "/" + yesterday.getFullYear();
    let value = {
      val: val,
      userId: userid,
      categoryname: categoryname,
      categoryfunc: categoryfunc,
      date: Datecreate
    };
    return db
      .get()
      .collection("value")
      .insertOne(value, { w: 1 });
  },
  all(userid, categoryfunc) {
    return db
      .get()
      .collection("value")
      .find({ userId: userid, categoryfunc: categoryfunc })
      .toArray();
  },
  find(userid, categoryname, categoryfunc) {
    return db
      .get()
      .collection("value")
      .find({
        userId: userid,
        categoryname: categoryname,
        categoryfunc: categoryfunc
      })
      .toArray();
  },
  finddate(userid, categoryname, categoryfunc, date) {
    return db
      .get()
      .collection("value")
      .find({
        userId: userid,
        categoryname: categoryname,
        categoryfunc: categoryfunc,
        date: date
      })
      .toArray();
  },

  date(userid) {
    return db
      .get()
      .collection("value")
      .find({ userId: userid })
      .toArray();
  },

  update(_id) {
    if (typeof _id !== "object") _id = ObjectID(_id);
    return db
      .get()
      .collection("value")
      .update({ _id }, { $set: { categoryname: "Other" } });
  },
  updatename(_id, newname) {
    if (typeof _id !== "object") _id = ObjectID(_id);
    return db
      .get()
      .collection("value")
      .update({ _id }, { $set: { categoryname: newname } });
  }
};
