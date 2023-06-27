const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const WebSocket = require('ws');

const server = app.listen(port, () => {
  console.log('Servidor Express escuchando en el puerto 5000');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  console.log('Cliente conectado.');
  ws.on('message', (message) => {
    console.log('Mensaje recibido del cliente:', message);
    ws.send('Servidor recibió: ' + message);
  });

  ws.on('close', () => {
    console.log('Cliente desconectado.');
  });

  // Enviar un mensaje a todos los clientes conectados
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ mensaje: '¡Hola, clientes conectados!' }));
  });
});

// Endpoint para servir la página HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Endpoint de la API para manejar la solicitud POST
app.post('/insert', (req, res) => {
  console.log("Actualizando datos");

  // Procesar los datos JSON entrantes
  const latestData = req.body;
  console.log(req.body);
  // Emitir los datos más recientes a los clientes conectados a través de WebSocket
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ evento: 'dataUpdate', datos: latestData }));
  });

  res.sendStatus(200); // Enviar un estado de respuesta de 200 OK
});

function enviarMensajeACliente(token, message, enviarVacio = false) {
  const ws = clients.get(token);
  let body = {};

  if (enviarVacio) {
    body = JSON.stringify({});
  } else {
    body = JSON.stringify({ mensaje: message });
  }

  if (ws) {
    ws.send(body);
    console.log('Mensaje enviado a la pantalla:', body);
  }
}
