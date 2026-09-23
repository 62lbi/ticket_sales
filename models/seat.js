'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.ticket, {
        foreignKey: "seatID", as: "seatTicket" //im using hasOne (one to one) since one ticket means one seat.
      })
      this.belongsTo(models.event, { foreignKey: 'eventID'});
    }
  }
  seat.init({
    seatID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    eventID: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    //this line before has a "eventID: DataTypes.INTEGER," but since im calling it out again in line 23 i have to remove it in line 27
    rowNum: DataTypes.STRING,
    seatNum: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'seat',
  });
  return seat;
};