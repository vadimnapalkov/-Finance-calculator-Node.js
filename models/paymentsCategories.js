const db = require("../db.js");
const parentCategories = require("./parentCategories");

class paymentsCategories extends parentCategories {
  static Categories() {
    return db.get().collection("paymentsCategories");
  }

  static description() {
    let description = "out";
    return description;
  }
}

module.exports = paymentsCategories;
