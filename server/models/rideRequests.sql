CREATE TABLE ride_requests
(
  id SERIAL PRIMARY KEY,
<<<<<<< HEAD
<<<<<<< HEAD
  ride_id INT REFERENCES rides(ride_id),
  user_id INT REFERENCES users(user_id),
=======
  user_id INT REFERENCES users(user_id),
  ride_id INT REFERENCES rides(ride_id),
>>>>>>> ft/#158787498/create-ride-offer
=======
  user_id INT REFERENCES users(user_id),
  ride_id INT REFERENCES rides(ride_id),
>>>>>>> f03eccc6fbc0a3ce35552d4af29b7bd5791ac1be
  accepted BOOLEAN,
  UNIQUE(ride_id, user_id)
);