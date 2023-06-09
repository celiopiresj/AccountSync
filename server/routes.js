const express = require('express');
const path = require('path');
const { requireAccountController } = require('../app/routes.js')
const accountController = requireAccountController();

const router = express.Router();

router.use('/libs', express.static(path.join(__dirname, '..', 'libs')));
router.use('/public', express.static(path.join(__dirname, '..', 'public')));

router.get('/', accountController.getIndex);
router.get('/accounts', accountController.getAllAccounts);

module.exports = router;
