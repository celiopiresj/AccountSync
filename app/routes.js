const path = require('path');

function viewPath(dirName, fileName) {
    return path.join(__dirname, 'views', dirName, fileName);
}

function requireAccountModel() {
    const accountModel = require('./models/account/accountModel');
    return accountModel;
}

function requireAccountController() {
    const accountModel = require('./controllers/account/accountController');
    return accountModel;
}

function requireRootPage(dirName,fileName) {
    return path.join(__dirname, '..', dirName, fileName);
}

module.exports = {
    viewPath,
    requireAccountModel,
    requireAccountController,
    requireRootPage,
};