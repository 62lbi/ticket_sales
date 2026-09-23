'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  discount.init({
    discountID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    discountName: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    expiredDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'discount',
  });
  return discount;
};