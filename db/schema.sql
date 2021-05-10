/* This will drop/delete the tables every time you run 
the schema.sql file, ensuring that you start with a clean slate. 

the candidates table must be dropped before the parties table due to 
the foreign key constraint that requires the parties table to exist.*/
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties;

/*creates voters table*/
/*we added a new field, created_at, with a data type of DATETIME. 
In SQL, a DATETIME field's value will look something like 2020-01-01 13:00:00.

front-end team can take that value, convert it with JavaScript's Date() constructor, 
and display anything they want at that point.*/
CREATE TABLE voters (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

/* creates parties table */
/* Note how we used a TEXT data type for 
description instead of VARCHAR. A party's 
description has the potential to be anywhere 
from one to several sentences long, but the VARCHAR 
data type must declare a limit on the length. TEXT, 
on the other hand, can store much longer strings of varying length. 

Because TEXT is more lenient, it might be tempting to always use 
TEXT over VARCHAR. However, overuse of TEXT fields can bloat the 
database because MySQL will allocate the maximum amount of space for 
a TEXT value, no matter how long the value is. In SQL, it's important 
to keep the size of data in check as much as possible. If you know 
a field's data will be on the short side, always go with VARCHAR!*/
CREATE TABLE parties (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

/* Creates candidates table */
/* We've added a new line to the table called a constraint. 
This allows us to flag the party_id field as an official 
foreign key and tells SQL which table and field it references. 
In this case, it references the id field in the parties table. 
This ensures that no id can be inserted into the candidates 
table if it doesn't also exist in the parties table. MySQL 
will return an error for any operation that would violate a constraint. 

Because this constraint relies on the parties table, the parties 
table MUST be defined first before the candidates table. Make sure to 
order your tables in schema.sql correctly.

we added ON DELETE SET NULL to tell SQL to set a candidate's party_id 
field to NULL if the corresponding row in parties is ever deleted.*/
CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  party_id INTEGER,
  industry_connected BOOLEAN NOT NULL,
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);