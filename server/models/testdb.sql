DROP DATABASE IF EXISTS ridemyway_test;
CREATE DATABASE ridemyway_test;

\c ridemyway_test;

CREATE TABLE users
(
  user_id SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NULL
);

CREATE TABLE rides
(
  ride_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  location VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  departuretime TIME NOT NULL,
  datecreated DATE NOT NULL,
  seatsavailable INT NOT NULL
);

CREATE TYPE status AS ENUM ('pending', 'rejected', 'accepted');
CREATE TABLE ride_requests
(
  id SERIAL PRIMARY KEY,
  ride_id INT REFERENCES rides(ride_id),
  user_id INT REFERENCES users(user_id),
  request_id INT REFERENCES users(user_id),
  requester_name VARCHAR(255),
  request_status status DEFAULT('pending'),
  UNIQUE(ride_id, user_id, request_id)
);