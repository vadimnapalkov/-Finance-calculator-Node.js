const { MongoClient } = require("mongodb");

let db;

const DATA_BASE_ROUTE =
  process.env.DATA_BASE_ROUTE || "mongodb://localhost:27017/Finance";

module.exports = () => {
  return MongoClient.connect(DATA_BASE_ROUTE).then(client => {
    db = client;
  });
};

module.exports.get = () => {
  return db;
};
