-- DROP TABLE IF EXISTS ride_requests CASCADE;

CREATE TABLE ride_requests
(
  id SERIAL PRIMARY KEY,
<<<<<<< HEAD
  ride_id INT REFERENCES rides(ride_id),
  user_id INT REFERENCES users(user_id),
=======
  user_id INT REFERENCES users(user_id),
  ride_id INT REFERENCES rides(ride_id),
>>>>>>> ft/#158787498/create-ride-offer
  accepted BOOLEAN,
  UNIQUE(ride_id, user_id)
);