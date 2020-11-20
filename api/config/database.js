const mongoose = require('mongoose');

const dbName = 'places_iuk';



module.exports = {
  connect: () => mongoose.connect('mongodb://localhost/'+dbName),
  dbName: dbName,
  
  connection: () => {
    if (mongose.connection)
      return mongoose.connection;
    return this.connect();
  }
};