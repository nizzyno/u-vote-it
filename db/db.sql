/* We'll create files for database and table creation, called db.sql and schema.sql respectively, 
as well as a file for data insertion called seeds.sql. We'll use these files to create and populate the candidates table. */
DROP DATABASE IF EXISTS election; /* enable the creation of a new database and only attempt to drop the database if it exists. */
CREATE DATABASE election;
USE election;