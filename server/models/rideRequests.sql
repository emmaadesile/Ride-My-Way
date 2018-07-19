CREATE TYPE status AS ENUM ('pending', 'rejected', 'accepted');
CREATE TABLE ride_requests
(
  id SERIAL PRIMARY KEY,
  ride_id INT REFERENCES rides(ride_id),
  user_id INT REFERENCES users(user_id),
  request_id INT REFERENCES users(user_id),
  request_status status DEFAULT('pending'),
  UNIQUE(ride_id, user_id, request_id)
);