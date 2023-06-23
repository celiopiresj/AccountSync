const { viewPath, requireAccountModel } = require('../../routes.js');
const path = require('path');
const fs = require('fs');
const accountModel = requireAccountModel();
const { google } = require('googleapis');

class AccountController {
  getIndex(req, res) {
    res.render(viewPath('account', 'login'));
  }

  getAllAccounts(req, res) {
    accountModel.getAllAccounts((err, accounts) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.render(viewPath('account', 'accounts'), { accounts });
      }
    });
  }

}

module.exports = new AccountController();