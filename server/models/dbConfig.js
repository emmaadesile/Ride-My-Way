import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

<<<<<<< HEAD
// const dbConfig = new Pool({
//   user: process.env.DB_USERNAME,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   min: 0,
//   max: 10, // max number of connection that can be open to database
//   idleTimeoutMills: 3000 // how long client is allowed to remain idle before being closed
// });

// dbConfig.connect();

const dbConfig = {
  user: 'postgres',
=======
const pool = new Pool({
  user: process.env.DB_USERNAME,
>>>>>>> 3787a611ffe6fc520413c4d5e74ffec7f3ff1534
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  min: 0,
  max: 10, // max number of connection that can be open to database
  idleTimeoutMills: 3000 // how long client is allowed to remain idle before being closed
});

// pool.connect();

export default pool;
