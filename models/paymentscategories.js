'use strict';
module.exports = (sequelize, DataTypes) => {
  const paymentsCategories = sequelize.define('paymentsCategories', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  paymentsCategories.associate = function(models) {
    // associations can be defined here
  };
  return paymentsCategories;
};