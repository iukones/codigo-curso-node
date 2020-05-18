
const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  name: String,
  admin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports =  User;