const express = require('express');
const app = express();

// Importe o módulo do roteador
const router = require('./routes.js');

// Use o roteador para tratar as rotas
app.use(router);

// Inicie o servidor
app.listen({
  host: '0.0.0.0',
  port : process.ENV.PORT || 5500
}).then(()=>{
  console.log('HTTP Server running')
});