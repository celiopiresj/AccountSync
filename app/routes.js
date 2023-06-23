const path = require('path');

class Routes {
  static viewPath(dirName, fileName) {
    return path.join(__dirname, 'views', dirName, fileName);
  }

  static requireAccountController() {
    const accountController = require('./controllers/account/accountController');
    return accountController;
  }

  static requireLoginController(){
    const loginController = require('./controllers/account/loginController');
    return loginController;
  }

  static requireDriveController() {
    const driveController = require('./controllers/drive/driveController');
    return driveController;
  }
  
  static requireAccountModel() {
    const accountModel = require('./models/account/accountModel');
    return accountModel;
  }

  static requireUserModel() {
    const userModel = require('./models/account/userModel');
    return userModel;
  }

  static requireDriveModel() {
    const driveModel = require('./models/drive/driveModel');
    return driveModel;
  }

  static requireRootPage(dirName, fileName) {
    return path.join(__dirname, '..', dirName, fileName);
  }

  static pathStatic(dirName) {
    return path.join(__dirname, 'views', 'statics', dirName);
  }
}

module.exports = Routes;