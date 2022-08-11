console.clear();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

require('dotenv').config()
app.use(bodyParser.json());
const port = 2083;

var cors = require('cors')
app.use(cors())

const TwitchApi = require("node-twitch").default;


const twitch = new TwitchApi({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

app.post('/api/twitch/', async function (req, res) {
  if (!req.body.name) {
    res.send('No name provided');
  } else {
    var streams = await twitch.getStreams({ channel: req.body.name });
    if (streams.data.length > 0) {
      res.send(streams.data[0]);
    } else {
      res.send('Not live');
    }
  }
});

// Start server
app.listen(port, function () {
  console.log(`Server listening on port ${port} | ${new Date()}`);
});