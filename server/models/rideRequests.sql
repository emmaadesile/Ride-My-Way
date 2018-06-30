CREATE TABLE ride_requests(
  id SERIAL PRIMARY KEY,
  ride_id INT NOT NULL,
  user_id INT NOT NULL,
  accepted BOOLEAN,
  FOREIGN KEY(ride_id) REFERENCES rides(id)
);