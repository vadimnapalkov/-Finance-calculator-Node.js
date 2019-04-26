const models = require("../models");
const parentCategories = require("./parentCategories");

class incomingCategoriesController extends parentCategories {
  static Categories() {
    return models.incomingCategories;
  }

  static description() {
    let description = "in";
    return description;
  }
}

module.exports = incomingCategoriesController;
