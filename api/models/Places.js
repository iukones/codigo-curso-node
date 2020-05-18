const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('./Uploader');
const slugify = require('../plugins/slugify');

let placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  address: String,
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
placeSchema.methods.updateImage = function(path, imageType) {
  // Primero subir la imagen
  // Guardar el lugar
  return uploader(path)
    .then(secure_url => this.saveImageUrl(secure_url, imageType));
}

placeSchema.methods.saveImageUrl = function(secureUrl, imageType) {
  this[imageType + 'Image'] = secureUrl;
  return this.save();
}

// Aqui tengo un bug con el 'pre' del slug hay que corregir no genera pretty url
placeSchema.pre('save', function(next){
  if(this.slug) return next();
  generateSlugAndContinue.call(this, 0, next);
});
// Aqui tengo un bug con el 'pre' del slug hay que corregir

placeSchema.statics.validateSlugCount = function(slug){
  return Place.count({slug: slug}).then(count => {
    if(count > 0) return false;
    return true;
  })
}


placeSchema.plugin(mongoosePaginate);

function generateSlugAndContinue(count, next){
  this.slug = slugify(this.title);
  if(count != 0)
      this.slug = this.slug + "-"+count;
    
  Place.validateSlugCount(this.slug).then(isValid => {
    if(!isValid)
      return generateSlugAndContinue.call(this, count+1, next);

    next();
  })
}

let Place = mongoose.model('Place', placeSchema);

module.exports = Place;