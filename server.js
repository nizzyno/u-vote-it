// import express
const express = require('express');
// import mysql2
const mysql = require('mysql2');

// Add the PORT designation and the app expression
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// code that will connect the application to the MySQL database
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: '1AppleMac$',
    database: 'election',
  },
  console.log('Connected to the election database.')
);

// query the database to test the connection
/* the db object is using the query() method. 
This method runs the SQL query and executes the callback 
with all the resulting rows that match the query. */
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

// GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id < 10`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });

// Delete a candidate
/* The DELETE statement has a question mark (?) that denotes a placeholder, 
making this a prepared statement. A prepared statement can execute the same 
SQL statements repeatedly using different values in place of the placeholder. */
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Create a candidate
/* In the SQL command we use the INSERT INTO command for the candidates table 
to add the values that are assigned to params. The four placeholders must match 
the four values in params, so we must use an array.

Because the candidates table includes four columns—id, first_name, last_name, 
and industry_connected—we need four placeholders (?) for those four values. The values 
in the params array must match the order of those placeholders. */
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//               VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// function that will start the Express.js server on port 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
