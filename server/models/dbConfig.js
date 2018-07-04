import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  min: 0,
  max: 10, // max number of connection that can be open to database
  idleTimeoutMills: 3000 // how long client is allowed to remain idle before being closed
});

// pool.connect();

export default pool;
