const models = require("../models");

exports.set = (userId, otherId, description) => {
  let OtherIdUser = {
    userId: userId,
    otherId: otherId,
    description: description
  };
  models.idOtherUsers.create(OtherIdUser);
};

exports.get = (userId, description) => {
  return models.idOtherUsers.findAll({
    where: { userId: userId, description: description }
  });
};
