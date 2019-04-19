const db = require("../db.js");
idOtherUsers = () => {
  return db.get().collection("idOtherUsers");
};

exports.set = (userId, otherId, description) => {
  let OtherId = {
    userId: userId,
    otherId: otherId,
    description: description
  };
  idOtherUsers().insertOne(OtherId);
};

exports.get = (userId, description) => {
  idOtherUsers().findOne({ userId: userId, description: description });
};
