const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');

const app = express();

app.get('/api', (req, res) => {
  res.send({ data: 'Hello world' });
});

// api.get('/serve-bg-image', (req, res) => {
//   serveStatic
// });

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Listening on port', port));
