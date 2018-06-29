import { Pool } from 'pg';

const config = {
  user: 'postgres',
  database: 'ride-my-way',
  password: 'dbadmin900',
  port: 5432,
  max: 10, // max number of connection that can be open to database
  idleTimeoutMills: 3000 // how long client is allowed to remain idle before being closed
};

const pool = new Pool(config);

export default pool;
