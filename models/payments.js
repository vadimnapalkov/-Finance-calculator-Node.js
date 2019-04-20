const db = require("../db.js");
const { ObjectID } = require("mongodb");

BuildPayment = (val, userId, categoryId, description, Datecreate) => {
  let payment = {
    value: val,
    userId: userId,
    categoryId: categoryId,
    description: description,
    date: Datecreate
  };
  return payment;
};

BuildDate = () => {
  var yesterday = new Date();
  return yesterday.getMonth() + 1 + "/" + yesterday.getFullYear();
};

payment = () => {
  return db.get().collection("payment");
};

const Payment = {
  add(value, userId, categoryId, description) {
    var Datecreate = BuildDate();
    let paymentInsert = BuildPayment(
      value,
      userId,
      categoryId,
      description,
      Datecreate
    );
    return payment().insertOne(paymentInsert);
  },

  all(userid, description) {
    return payment()
      .find({ userId: userid, description: description })
      .toArray();
  },

  findCategory(categoryId, description) {
    return payment()
      .find({
        categoryId: String(categoryId),
        description: description
      })
      .toArray();
  },

  findDate(userid, categoryId, description, date) {
    return payment()
      .find({
        userId: userid,
        categoryId: categoryId,
        description: description,
        date: date
      })
      .toArray();
  },

  update(_id, idOther) {
    if (typeof _id !== "object") _id = ObjectID(_id);
    return payment().update({ _id }, { $set: { categoryId: idOther } });
  }
};

module.exports = Payment;
