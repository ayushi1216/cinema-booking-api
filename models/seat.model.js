module.exports = (sequelize, DataTypes) => {

  return sequelize.define('Seat', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    cinemaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cinemas',
        key: 'id',
      },
    },
    seatNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isBooked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

};
