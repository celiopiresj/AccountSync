const express = require('express');
const app = express();

// Importe o módulo do roteador
const router = require('./routes.js');

// Use o roteador para tratar as rotas
app.use(router);

const port = process.env.PORT ? Number(process.env.PORT) : 5500;

app.listen(port, () => {
  console.log('HTTP Server running');
});