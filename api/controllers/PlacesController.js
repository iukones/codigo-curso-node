
const Place = require('../models/Places');
const upload = require('../config/upload');
const uploader = require('../models/Uploader');

// agregamos el middleware find
function find(req, res, next) {
  Place.findById(req.params.id)
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
  console.log(req.body);
  Place.create({
    title: req.body.title,
    description: req.body.description,
    acceptsCreditCard: req.body.acceptsCreditCard,
    openHour: req.body.openHour,
    closeHour: req.body.closeHour
  }).then( doc => {
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
  let attributes = ['title', 'description', 'acceptsCreditCard', 'openHour', 'closeHour'];
  let placeParams = {};
  
  attributes.forEach(attr => {
    if (Object.prototype.hasOwnProperty.call(req.body, attr))
      placeParams[attr] = req.body[attr];
  })
  
  req.place = Object.assign( req.place, placeParams );

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

// subir imagen a cloudinary
function saveImage(req, res){
  if (req.place) {
    if(req.files && req.files.avatar){
      const path = req.files.avatar[0].path;
      uploader(path).then(result => {
        console.log(result);
        res.json(req.place);
      }).catch( err => {
        console.log( err );
        res.json( err );
      })
    }
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