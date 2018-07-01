import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
import expressValidator from 'express-validator';
import expressSession from 'express-session';
import routes from './routes/index';

// Setup express app
const app = express();

app.use(logger('dev'));

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Validation
app.use(expressValidator());

// Express sesion
app.use(expressSession());

const port = process.env.PORT || 8000;
app.set('port', port);

// Create the server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});

// Express router
routes(app);

export default app;
