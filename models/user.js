const bcrypt = require("bcrypt");
const db = require("../db.js");
const { ObjectID } = require("mongodb");

module.exports.User = {
  save(data, cb) {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) return cb(err);
      bcrypt.hash(data.pass, salt, (err, hash) => {
        if (err) return cb(err);
        const pass = hash;
        password = { pass: pass, salt: salt };
        let user = {
          name: data.name,
          pass: password.pass,
          salt: password.salt
        };
        return cb(null, user);
      });
    });
  },

  setUser(user) {
    return db
      .get()
      .collection("users")
      .insertOne(user, { w: 1 });
  },
  all() {
    return db
      .get()
      .collection("users")
      .find()
      .toArray();
  },

  getByName(name) {
    return db
      .get()
      .collection("users")
      .findOne({ name: name });
  },

  get(_id) {
    if (typeof _id !== "object") _id = ObjectID(_id);
    return db
      .get()
      .collection("users")
      .findOne({ _id });
  },

  authenticate(data, cb) {
    db.get()
      .collection("users")
      .findOne({ name: data.name })
      .then(users => {
        if (users != null) {
          bcrypt.hash(data.pass, users.salt, (err, hash) => {
            if (err) return cb(err);
            if (hash == users.pass) return cb(null, users);
            cb();
          });
        } else return cb();
      });
  }
};
