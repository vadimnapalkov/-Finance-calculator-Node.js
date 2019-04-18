const { MongoClient } = require("mongodb");

let db;

module.exports = () => {
  return MongoClient.connect("mongodb://localhost:27017/cash").then(client => {
    db = client;
  });
};

module.exports.get = () => {
  return db;
};
