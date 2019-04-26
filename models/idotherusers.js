'use strict';
module.exports = (sequelize, DataTypes) => {
  const idOtherUsers = sequelize.define('idOtherUsers', {
    userId: DataTypes.INTEGER,
    otherId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  idOtherUsers.associate = function(models) {
    // associations can be defined here
  };
  return idOtherUsers;
};