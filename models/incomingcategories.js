'use strict';
module.exports = (sequelize, DataTypes) => {
  const incomingCategories = sequelize.define('incomingCategories', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  incomingCategories.associate = function(models) {
    // associations can be defined here
  };
  return incomingCategories;
};