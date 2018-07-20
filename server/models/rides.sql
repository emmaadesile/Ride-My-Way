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