const db = require("../db.js");
idOtherUsers = () => {
  return db.get().collection("idOtherUsers");
};

exports.set = (userId, otherId, description) => {
  let OtherIdUser = {
    userId: userId,
    otherId: String(otherId),
    description: description
  };
  idOtherUsers().insertOne(OtherIdUser);
};

exports.get = (userId, description) => {
  return idOtherUsers().findOne({ userId: userId, description: description });
};
