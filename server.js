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
db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// function that will start the Express.js server on port 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
