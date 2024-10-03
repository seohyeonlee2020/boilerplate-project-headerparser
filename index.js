// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// request header parser
app.get('/api/whoami', function (req, res) {
  const rawHeaders = req.rawHeaders;
  //extract keys following given keywords: 'x-forwarded-for' for 'ipaddress', 'accept-language' for language, 'user-agent' for 'software'
  console.log(req.rawHeaders);
  //extract indices for said keywords
  const ipaddress_idx = rawHeaders.indexOf('x-forwarded-for') + 1;
  const language_idx = rawHeaders.indexOf('accept-language') + 1;
  const software_idx = rawHeaders.indexOf('user-agent') + 1;
  //take the indieces right next to extracted indices
  const ipaddress_val = rawHeaders[ipaddress_idx + 1];
  const language_val = rawHeaders[language_idx + 1];
  const software_val = rawHeaders[software_idx + 1];

  //send selected values into res.json
  res.json({ ipaddress: ipaddress_val, language: language_val, software: software_val});
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
