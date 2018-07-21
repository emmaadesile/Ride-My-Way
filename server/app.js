import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
import routes from './routes/index';

const router = express.Router();
routes(router);

// Setup express app
const app = express();

app.use(logger('dev'));

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;
app.set('port', port);

// Create the server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});

// Enable cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Express router
routes(app);

app.use('/api/v1', router);

export default app;
