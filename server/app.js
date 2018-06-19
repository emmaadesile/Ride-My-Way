import express from "express";
import bodyParser from "body-parser";
import http from "http";
import logger from "morgan";

//Setup express app
const app = express();

app.use(logger("dev"));

//Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port); 

//Create the server
const server = http.createServer(app);

server.listen(port, (req, res) => {
  console.log(`Server is running on localhost:${port}`)
});

app.get("*", (req, res) => res.status(200).send({
  Success: "Welcome to Ride My Way API"
}));

export default app;