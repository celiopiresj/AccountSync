const express = require('express');
const path = require('path');
const { requireAccountController, requireLoginController, pathStatic} = require('../app/routes.js')
const accountController = requireAccountController();
const loginController = requireLoginController();

const router = express.Router();

router.use('/libs', express.static(path.join(__dirname, '..', 'libs')));
router.use('/public', express.static(path.join(__dirname, '..', 'public')));
router.use('/material-icons', express.static(path.join(__dirname, '..', 'node_modules/@material-design-icons/svg/outlined')));

router.use('/statics/login', express.static(pathStatic('login')));

router.get('/', accountController.getIndex);
router.get('/accounts', accountController.getAllAccounts);
router.get('/drive', accountController.getAllAccounts);

router.post('/login', loginController.loginUser);

module.exports = router;
