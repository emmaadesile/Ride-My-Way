// import pool from '../models/dbConfig';

// beforeEach((done) => {
//   const dropTablesv  = 'DROP DATABASE IF EXISTS ride_my_way_test;';
//   //   DROP TABLE IF EXISTS users CASCADE;
//   //   DROP TABLE IF EXISTS rides CASCADE; 
//   //   DROP TABLE IF EXISTS ride_requests;
//   // `;
//   const createTables = `
//     CREATE TABLE users
//     (
//       user_id SERIAL PRIMARY KEY,
//       firstname VARCHAR(255) NOT NULL,
//       lastname VARCHAR(255) NOT NULL,
//       username VARCHAR(255) NOT NULL,
//       email VARCHAR(255) UNIQUE NOT NULL,
//       password VARCHAR(255) NULL
//     );

//     CREATE TABLE rides
//     (
//       ride_id SERIAL PRIMARY KEY,
//       user_id INT REFERENCES users(user_id),
//       location VARCHAR(255) NOT NULL,
//       destination VARCHAR(255) NOT NULL,
//       departuretime TIME NOT NULL,
//       datecreated DATE NOT NULL,
//       seatsavailable INT NOT NULL
//     );

//     CREATE TABLE ride_requests
//     (
//       id SERIAL PRIMARY KEY,
//       ride_id INT REFERENCES rides(ride_id),
//       user_id INT REFERENCES users(user_id),
//       request_id INT REFERENCES users(user_id),
//       accepted BOOLEAN DEFAULT FALSE,
//       UNIQUE(ride_id, user_id, request_id)
//     );
//   `;
//   pool.query(dropTables);
//   pool.query(createTables, done());
// });
