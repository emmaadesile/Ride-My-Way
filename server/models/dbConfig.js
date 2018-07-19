import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();

const environment = process.env.NODE_ENV;

let pool;

if (environment === 'development') {
  pool = new Pool(config.development);
}
if (environment === 'test') {
  pool = new Pool(config.test);
}

if (environment === 'production') {
  pool = new Pool(config.production);
}

export default pool;
