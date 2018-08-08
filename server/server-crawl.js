const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
const fs = require('fs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use(function (req, res, next) {
  console.log('req.body', req.body);
  next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/create-stage', function (req, res) {
  const dir = fs.readdirSync('../src/assets/stages');

  return res.json(req.body);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
