'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resto_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  resto_product.init({
    product: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    jenis: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'resto_product',
  });
  return resto_product;
};