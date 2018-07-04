DROP DATABASE IF EXISTS ride_my_way;
CREATE DATABASE ride_my_way;

\c ride_my_way;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  user_id SERIAL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NULL
);  