const express = require('express');
const app = express();
const routes = require('./routes.js');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.json());
app.use('/', routes);

const port = process.env.PORT ? Number(process.env.PORT) : 5500;

app.listen(port, () => {
  console.log('HTTP Server running on port ' + port);
});