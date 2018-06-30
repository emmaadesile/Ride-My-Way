CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  phone INT NOT NOT NULL
  username VARCHAR(255) NOT NULL,
  email VARCHAR(2s55) NOT NULL
);

CREATE TABLE rides (
  id SERIAL PRIMARY KEY,
  location VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  departure_time TIME NOT NULL,
  time_created DATE NOT NULL DEFAULT CURRENT_DATE,
  seats_available INT NOT NULL
);

CREATE TABLE ride_requests(
  id SERIAL PRIMARY KEY,
  ride_id INT NOT NULL,
  user_id NOT NULL
);