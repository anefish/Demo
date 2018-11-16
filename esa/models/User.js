var mongoose = require('mongoose');
var UserSchema = require('../schemas/UserSchema');

var User = mongoose.model('users', UserSchema);

module.exports = User;
