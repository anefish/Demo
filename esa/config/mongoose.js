const mongoose = require('mongoose');
const config = require('./config');

module.exports = () => {
  mongoose.connect(config.mongodb);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('connection success!');
  });

  return db;
}
