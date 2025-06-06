const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Cinema = require('./cinema.model')(sequelize, Sequelize);
db.Seat = require('./seat.model')(sequelize, Sequelize);

// Defining Relationships.                                 
// Creating foreign key 'cineamId' in seats table
db.Cinema.hasMany(db.Seat, { foreignKey: 'cinemaId' })
db.Seat.belongsTo(db.Cinema, { foreignKey: 'cinemaId' });


module.exports = db;
