const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('./Uploader');

let placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  acceptsCreditCard: {
    type: Boolean,
    default: false
  },
  coverImage: String,
  avatarImage: String,
  openHour: Number,
  closeHour: Number
});

// Guardar info de imagenes en la BD
placeSchema.methods.updateAvatar = function(path) {
  // Primero subir la imagen
  // Guardar el lugar
  return uploader(path)
    .then(secure_url => this.saveAvatarUrl(secure_url));
}

placeSchema.methods.saveAvatarUrl = function(secureUrl) {
  this.avatarImage = secureUrl;
  return this.save();
}

placeSchema.plugin(mongoosePaginate);

let Place = mongoose.model('Place', placeSchema);

module.exports = Place;