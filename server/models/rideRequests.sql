-- DROP TABLE IF EXISTS ride_requests CASCADE;

CREATE TABLE ride_requests
(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  ride_id INT REFERENCES rides(ride_id),
  accepted BOOLEAN,
  UNIQUE(ride_id, user_id)
);