
const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

const Place = require('./Places');

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

userSchema.post('save', function(user, next) {
  User.count({}).then(count => {
    if (count == 1) {
      /* user.admin = true;
      user.save().then(next); */
      User.update({'_id': user._id}, {admin:true}).then(result => {
        next();
      })
    }else {
      next();
    }
  })
});

//bug en la funcion myPlaces virtuals
userSchema.virtual('place').get(function() {
  console.log(this._id);
  return Place.find({'_user': this._id});
})

userSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', userSchema);

module.exports =  User;