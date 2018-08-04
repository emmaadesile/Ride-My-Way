import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
import cors from 'cors';
import routes from './routes/index';

const router = express.Router();
routes(router);

// Setup express app
const app = express();

app.use(logger('dev'));

// user cors
app.use(cors());


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

// Express router
routes(app);

app.use('/api/v1', router);

export default app;
