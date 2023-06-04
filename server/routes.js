const express = require('express');
const path = require('path');

const router = express.Router();

// Define a rota para os arquivos da pasta "libs"
router.use('/libs', express.static(path.join(__dirname, '..', 'libs')));

// Define a rota para os arquivos da pasta "public"
router.use('/public', express.static(path.join(__dirname, '..', 'public')));

// Define a rota para o arquivo específico

// Define a rota raiz para servir o arquivo "index.html"
router.use('/', express.static(path.join(__dirname, '..', 'app')));

module.exports = router;
