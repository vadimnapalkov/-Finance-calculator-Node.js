const bcrypt = require("bcrypt");
const db = require("../db.js");
const { ObjectID } = require("mongodb");

BuildUser = (name, pass, salt) => {
  let user = {
    name: name,
    pass: pass,
    salt: salt
  };
  return user;
};

users = () => {
  return db.get().collection("users");
};

const User = {
  save(data, cb) {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) return cb(err);
      bcrypt.hash(data.pass, salt, (err, hash) => {
        if (err) return cb(err);
        let user = BuildUser(data.name, hash, salt);
        return cb(null, user);
      });
    });
  },

  setUser(user, cb) {
    users().insertOne(user, (err, response) => {
      if (err) return cb(err);
      else return cb(null, response.ops[0]);
    });
  },

  getByName(name) {
    return users().findOne({ name: name });
  },

  get(_id) {
    if (typeof _id !== "object") _id = ObjectID(_id);
    return users().findOne({ _id });
  },

  authenticate(data, cb) {
    User.getByName(data.name).then(user => {
      if (user != null) {
        bcrypt.hash(data.pass, user.salt, (err, hash) => {
          if (err) return cb(err);
          if (hash == user.pass) return cb(null, user);
          cb();
        });
      } else return cb();
    });
  }
};

module.exports = User;
