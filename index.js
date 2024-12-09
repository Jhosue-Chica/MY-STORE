// Import express
const express = require('express');
// Asignar express a mi aplicacion
const app = express();
// Asignar puerto donde se ejecutara el proyecto
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola esta es mi tienda');
});

app.listen(3000, () => {
  console.log('Server iniciado en + ' + port);
});
