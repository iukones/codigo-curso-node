
const Place = require('../models/Places');
const upload = require('../config/upload');
const uploader = require('../models/Uploader');
const helpers = require('./helpers');

const validParams = [
  'title',
  'description',
  'address',
  'acceptsCreditCard',
  'openHour',
  'closeHour'
];

// agregamos el middleware find
function find(req, res, next) {
  Place.findOne({slug:req.params.id})
  .then( place => {
    req.place = place;
    next();
  }).catch( err => {
    next(err);
  });
}

function index(req, res) {
  //Todos los lugares
  Place.paginate({}, { page: req.query.page || 1, limit: 1, sort: {'_id': -1} })
    .then( docs => {
      res.json( docs );
    }).catch( err => {
      console.log( err );
      res.json( err );
    });
}

function create(req, res, next) {
  //Crear lugares
  const params = helpers.buildParams(validParams, req.body);
  console.log(req.user);
  params['_user'] = req.user.id;
  Place.create(params).then( doc => {
    req.place = doc;
    next();
  }).catch( err => {
    next(err);
  });
}

function show(req, res) {
  //Buscar individual
  res.json(req.place);
}

function update(req, res) {
  //Actualizar un recurso
  const params = helpers.buildParams(validParams, req.body);
  req.place = Object.assign( req.place, params );

  req.place.save().then( doc => {
    res.json( doc );
  }).catch( err => {
    console.log( err );
    res.json( err );
  });
}

function destroy(req, res) {
  //Eliminar recursos
  req.place.remove()
  .then( doc => {
    res.json({});
  }).catch( err => {
    console.log( err );
    res.json( err );
  });
}

// middleware multer para subir imagenes
function multerMiddleware(){
  return upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'cover', maxCount: 1}
  ]);
}

// subir imagen a cloudinary y guardar en la BD
function saveImage(req, res){
  if (req.place) {
    const files = ['avatar', 'cover'];
    const promises = [];

    files.forEach(imageType => {
      if(req.files && req.files[imageType]){
        const path = req.files[imageType][0].path;
        promises.push(req.place.updateImage(path, imageType));
      }
    })

    Promise.all(promises).then(result => {
      console.log(result);
      res.json(req.place);
    }).catch( err => {
      console.log( err );
      res.json( err );
    });

  }else {
    res.status(422).json({
      error: req.error || 'Could not save place'
    });
  }
}

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
  find,
  multerMiddleware,
  saveImage
}