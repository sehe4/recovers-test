const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());
app.use(bodyParser.json());

let latestData = {}; // Variable to store the latest data

// Endpoint to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// API endpoint to handle the POST request
app.post('/insert', (req, res) => {
  console.log("Updating data");

  // Process the incoming JSON data
  latestData = req.body;
  // Emit the latest data to connected clients via WebSocket
  io.emit('dataUpdate', latestData);

  res.sendStatus(200); // Send a response status of 200 OK
});

// Start the server
http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

