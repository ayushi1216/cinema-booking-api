require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());
app.use('/cinemas', require('./routes/cinema.routes'));

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
