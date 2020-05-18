
const Place = require('../models/Places');


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

function create(req, res) {
  //Crear lugares
  Place.create({  
    title: req.body.title,
    description: req.body.description,
    acceptsCreditCard: req.body.acceptsCreditCard,
    openHour: req.body.openHour,
    closeHour: req.body.closeHour
  }).then( doc => {
    res.json(doc)
  }).catch( err => {
    console.log(err);
    res.json(err);
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

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
  find
}