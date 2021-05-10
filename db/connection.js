// import mysql2
const mysql = require('mysql2');

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

module.exports = db;
