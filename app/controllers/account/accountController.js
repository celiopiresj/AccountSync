const { viewPath, requireAccountModel } = require('../../routes.js');
const accountModel= requireAccountModel();

const getIndex = (req, res) => {
  res.render(viewPath('account','login'));
};

const getAllAccountsController = (req, res) => {
  accountModel.getAllAccounts((err, accounts) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.render(viewPath('account','accounts'), { accounts });
    }
  });
};


module.exports = {
  getIndex,
  getAllAccounts: getAllAccountsController,
};