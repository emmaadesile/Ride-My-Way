-- DROP TABLE IF EXISTS ride_requests CASCADE;

CREATE TABLE ride_requests
(
  id SERIAL PRIMARY KEY,
  request_id SERIAL REFERENCES rides(ride_id),
  accepted BOOLEAN
);