const db = require("../db.js");
const parentCategories = require("./parentCategories");

class paymentsCategories extends parentCategories {
  static Categories() {
    return db.get().collection("incomeCategories");
  }

  static description() {
    let description = "in";
    return description;
  }
}

module.exports = paymentsCategories;
