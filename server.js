// import express
const express = require('express');
// import mysql2
const mysql = require('mysql2');
// import inputCheck function
const inputCheck = require('./utils/inputCheck');

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
// Get all candidates
app.get('/api/candidates', (req, res) => {
  const sql = `SELECT * FROM candidates`;

  db.query(sql, (err, rows) => {
    if (err) {
      /* Instead of logging the error, we'll send a status 
        code of 500 and place the error message within a JSON object. 
        This will all be handled within the error-handling conditional. 
        The 500 status code indicates a server error—different than a 404, 
        which indicates a user request error. The return statement will exit 
        the database call once an error is encountered. */
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// Get a single candidate
/* the endpoint has a route parameter that will hold the value 
of the id to specify which candidate we'll select from the database. 

In the database call, we'll assign the captured value populated in the 
req.params object with the key id to params. The database call will 
then query the candidates table with this id and retrieve the row specified. 
Because params can be accepted in the database call as an array, params is 
assigned as an array with a single element, req.params.id.*/
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
});

// Delete a candidate
/* The DELETE statement has a question mark (?) that denotes a placeholder, 
making this a prepared statement. A prepared statement can execute the same 
SQL statements repeatedly using different values in place of the placeholder. 

we're using a prepared SQL statement with a placeholder. We'll assign the 
req.params.id to params, as we did in the last route.

The JSON object route response will be the message "deleted", with the 
changes property set to result.affectedRows. Again, this will verify 
whether any rows were changed.*/
// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found',
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// Create a candidate
/* In the SQL command we use the INSERT INTO command for the candidates table 
to add the values that are assigned to params. The four placeholders must match 
the four values in params, so we must use an array.

Because the candidates table includes four columns—id, first_name, last_name, 
and industry_connected—we need four placeholders (?) for those four values. The values 
in the params array must match the order of those placeholders. 

We'll use the endpoint /api/candidate. In the callback function, we'll use 
the object req.body to populate the candidate's data. Notice that we're using 
object destructuring to pull the body property out of the request object.*/
app.post('/api/candidate', ({ body }, res) => {
  /* This inputCheck module is used to verify that user 
    info in the request can create a candidate. */
  const errors = inputCheck(
    body,
    'first_name',
    'last_name',
    'industry_connected'
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  /* The params assignment contains three elements in its array that
   contains the user data collected in req.body. 
   
   Using the query() method, we can execute the prepared SQL statement. 
   We send the response using the res.json() method with a success 
   message and the user data that was used to create the new data entry.*/
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// function that will start the Express.js server on port 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
