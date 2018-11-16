var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  address: String,
  pid: String,
  ip: String
});

module.exports = userSchema;
