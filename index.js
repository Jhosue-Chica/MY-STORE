const express = require('express'); // Importamos express
const routerApi = require('./routes'); // Importamos el archivo de rutas
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler'); // Importamos los middlewares de manejo de errores

const app = express(); // Inicializamos express
const port = 3000; // Puerto en el que se ejecutará el servido


const cors = require('cors'); // Importamos cors
app.use(cors()); // Usamos cors


// Middleware para que express pueda entender json
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('Hola esta es mi tienda');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy nueva ruta');
});

// Inicializamos las rutas
routerApi(app);

// Middlewares de manejo de errores
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Server iniciado en http://localhost:${port}`);
});
