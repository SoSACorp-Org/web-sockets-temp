const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const io = require('./socketUtils');

const scoreboard = require('./routes/scoreboard');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
io.init(server);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:9000");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use( bodyParser.urlencoded( { extended: true }) );
app.use( bodyParser.json() );
app.use( '/scoreboard', scoreboard);
app.use(function(req, res) {
  res.status(500).send('error');
});
app.use( (req, res) => res.status(404).send('No such path exists'));

server.listen(PORT, () => {
  console.log('server is running on port', server.address().port );
});