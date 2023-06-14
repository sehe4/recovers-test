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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API endpoint to handle the POST request
app.post('/insert', (req, res) => {
  console.log("Insertando datos")
  const data = JSON.parse(req.body);
  console.log(data);
  // Insert data into the PostgreSQL database
//   pool.query(query, (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).send('Error inserting data into the database');
//     } else {
//       console.log('Data inserted successfully');
//       res.status(200).send('Data inserted successfully');
//     }
//   });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



