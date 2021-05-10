// import express
const express = require('express');
//import mysql database
const db = require('./db/connection');
// import apiRoutes
const apiRoutes = require('./routes/apiRoutes');

// Add the PORT designation and the app expression
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express server for apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// function that will start the Express.js server on port 3001
// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
