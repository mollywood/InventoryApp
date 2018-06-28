'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sale = sequelize.define('Sale', {
    userid: DataTypes.INTEGER,
    productnumber: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {});
  Sale.associate = function(models) {
    // associations can be defined here
  };
  return Sale;
};