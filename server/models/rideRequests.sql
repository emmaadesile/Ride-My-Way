-- DROP TABLE IF EXISTS ride_requests CASCADE;

CREATE TABLE ride_requests(
  request_id SERIAL PRIMARY KEY,
  ride_id INT NOT NULL,
  user_id INT NOT NULL,
  accepted BOOLEAN,
  FOREIGN KEY(ride_id) REFERENCES rides(ride_id),
  FOREIGN KEY(user_id) REFERENCES rides(user_id)
);