import { Pool, Client } from 'pg';

const connectionString =
  process.env.DATABASE_URL || 'postgres://manny:dbadmin900@localhost:5432/ride-my-way';

const client = new Client({ connectionString });
client.connect();

export default client;