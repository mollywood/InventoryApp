'use strict';
module.exports = (sequelize, DataTypes) => {
  var Products = sequelize.define('Products', {
    productName: DataTypes.STRING,
    productSize: DataTypes.STRING,
    productPrice: DataTypes.DECIMAL,
    productColor: DataTypes.STRING,
    productURL: DataTypes.STRING,
    productQuantity: DataTypes.INTEGER
  }, {});
  Products.associate = function(models) {
    Products.belongsTo(models.productcategories, { as : 'productcategories', foreginKey: 'productCategoryID'})
  };
  return Products;
};