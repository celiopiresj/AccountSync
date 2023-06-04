const express = require('express');
const app = express();

// Importe o módulo do roteador
const router = require('./routes.js');

// Use o roteador para tratar as rotas
app.use(router);

// Inicie o servidor
app.listen(5500, function () {
  console.log('Servidor iniciado na porta 5500');
});