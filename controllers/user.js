const models = require("../models");
const bcrypt = require("bcrypt");

GenHash = (pass, cb) => {
  bcrypt.genSalt(12, (err, salt) => {
    if (err) return cb(err);
    bcrypt.hash(pass, salt, (err, hash) => {
      if (err) return cb(err);
      let password = { hash: hash, salt: salt };
      return cb(null, password);
    });
  });
};

ValidateHash = (pass, salt, cb) => {
  bcrypt.hash(pass, salt, (err, hash) => {
    if (err) return cb(err);
    return cb(null, hash);
  });
};

BuildUser = (name, password) => {
  let user = {
    name: name,
    hash: password.hash,
    salt: password.salt
  };
  return user;
};

class UserController {
  static all(cb) {
    models.users.findAll().then(items => {
      cb(items);
    });
  }
  static createUser(data, cb) {
    GenHash(data.pass, (err, password) => {
      if (err) return cb(err);
      let user = BuildUser(data.name, password);
      models.users.create(user).then(item => {
        cb(item);
      });
    });
  }
  static getByName(name, cb) {
    models.users.findAll({ where: { name: name } }).then(item => {
      cb(item);
    });
  }
  static validatePassword(pass, hash, salt, cb) {
    ValidateHash(pass, salt, (err, checkHash) => {
      if (err) cb(err);
      cb(null, hash === checkHash);
    });
  }
  static toJson(user) {
    let userResponse = {
      id: user.id,
      name: user.name
    };
    return userResponse;
  }
}

module.exports = UserController;
