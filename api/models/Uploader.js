
const cloudinary = require('cloudinary');

const secret = require('../config/secret');

cloudinary.config(secret.cloudinary);



module.exports = function(imagePath) {

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imagePath, function(result) {
      console.log(result);
      if(result.secure_url) return resolve(result.secure_url);

      reject(new Error('Error with cloudinary'));
    })
  })
}