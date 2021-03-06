import dotenv from 'dotenv';

dotenv.config();

const config =
{
  development: {
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    min: process.env.DB_MIN,
    max: process.env.DB_MAX,
    idleTimeoutMills: process.env.idleTimeoutMills
  },
  test: {
    user: 'postgres',
    database: 'ridemyway_test',
    host: 'localhost',
    port: '5432',
    min: 1,
    max: 10,
    idleTimeoutMills: 5000
  },
  // test: {
  //   user: process.env.DB_USERNAME_TEST,
  //   database: process.env.DB_DATABASE_TEST,
  //   host: process.env.DB_HOST,
  //   port: process.env.DB_PORT_TEST,
  //   min: process.env.DB_MIN_TEST,
  //   max: process.env.DB_MAX_TEST,
  //   idleTimeoutMills: process.env.idleTimeoutMills
  // },
  production: {
    connectionString: process.env.DATABASE_URL,
  }
};

export default config;
