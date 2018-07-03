-- DROP TABLE IF EXISTS rides CASCADE;
 
CREATE TABLE rides (
  ride_id SERIAL PRIMARY KEY,
  currentLocation VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  departure_time TIME NOT NULL,
  date_created DATE NOT NULL DEFAULT CURRENT_DATE,
  seats_available INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(user_id)
);