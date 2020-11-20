const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: false}));

const places = [
  {
    'id': '1',
    'title': 'Oficina CDMX',
    'Description': 'Lorem Ipsum',
    'Adress': 'sur #21 Col. Granjas',
    'C.P': '55021' 
  },
  {
    'id': '2',
    'title': 'Oficina CDMX',
    'Description': 'Lorem Ipsum',
    'Adress': 'sur #21 Col. Granjas',
    'C.P': '55021' 
  },
  {
    'id': '3',
    'title': 'Oficina CDMX',
    'Description': 'Lorem Ipsum',
    'Adress': 'sur #21 Col. Granjas',
    'C.P': '55021' 
  },
  {
    'id': '4',
    'title': 'Oficina CDMX',
    'Description': 'Lorem Ipsum',
    'Adress': 'sur #21 Col. Granjas',
    'C.P': '55021' 
  },
  {
    'id': '5',
    'title': 'Oficina CDMX',
    'Description': 'Lorem Ipsum',
    'Adress': 'sur #21 Col. Granjas',
    'C.P': '55021' 
  }
];

// el objeto "req" es para todo lo que recibimos, el "res" todo lo que vamos a responder o enviar.
app.get('/', (req, res) => {
  res.json(places);
});

// la propiedad .body es rellenada por la libreria "body-parser"
app.post('/', (req, res) => {
  res.json(req.body);
});

app.use(express.static('public'));

app.listen(3000, function() {
  console.log('Estoy listo para recibir peticiones');
});