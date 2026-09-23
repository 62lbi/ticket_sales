'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.seat, {
        foreignKey: "eventID", as: "eventSeat" //this just means like in this 1 event, it has many seats (added in 07:32 am)
      })
      this.hasMany(models.ticket, {
        foreignKey: "eventID", as: "eventTicket" //same goes for this, 1 event has many tickets
      })

    }
  }
  event.init({
    eventID: { //added this on (07:24 am)
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    eventName: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    venue: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'event',
  });
  return event;
};