'use strict';
module.exports = (sequelize, DataTypes) => {
  var productcategories = sequelize.define('productcategories', {
    productCategory: DataTypes.STRING,
    productGender: DataTypes.STRING
  }, {});
  productcategories.associate = function(models) {
    productcategories.hasMany(models.Products, { as : 'Products', foreignKey: 'productCategoriesID'})
  };
  return productcategories;
};