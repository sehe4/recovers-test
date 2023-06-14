const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

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
app.post('insert', (req, res) => {
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



