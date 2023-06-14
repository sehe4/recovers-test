const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'recovers',
  host: 'dpg-ci4evdlgkuvm71dnn7l0-a.oregon-postgres.render.com',
  database: 'recovers_db_wtgk',
  password: 'kndennjN9I9WDeSriMeiw88nk4FdBfwV',
  port: 5432
});

// Removed duplicate middleware
app.use(express.json());

// API endpoint to handle the POST request
app.post('/insert', (req, res) => {
  console.log("Inserting data");
  console.log(req.body);
  res.sendStatus(200); // Send a response status of 200 OK
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
