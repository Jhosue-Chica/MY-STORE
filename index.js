const express = require('express'); // Importamos express
const routerApi = require('./routes'); // Importamos el archivo de rutas
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler'); // Importamos los middlewares de manejo de errores
const cors = require('cors'); // Importamos cors
const helmet = require('helmet'); // Importamos helmet para seguridad
const { config } = require('./config/config'); // Importamos la configuración

const app = express(); // Inicializamos express
const port = config.port; // Usamos el puerto de la configuración

// Middlewares de seguridad
app.use(cors()); // Usamos cors
app.use(helmet()); // Añadimos helmet para protección de cabeceras HTTP

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
app.use(boomErrorHandler);
app.use(errorHandler);

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Server iniciado en http://localhost:${port}`);
});
