'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resto_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.resto_product, {foreignKey: "id"});
    }
  }
  resto_profile.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    membership: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'resto_profile',
  });
  return resto_profile;
};