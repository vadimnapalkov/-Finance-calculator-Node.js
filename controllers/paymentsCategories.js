const models = require("../models");
const parentCategories = require("./parentCategories");

class paymentsCategoriesController extends parentCategories {
  static Categories() {
    return models.paymentsCategories;
  }

  static description() {
    let description = "out";
    return description;
  }
}

module.exports = paymentsCategoriesController;
