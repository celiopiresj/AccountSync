const sqlite3 = require('sqlite3').verbose();
const { requireRootPage } = require('../../routes.js');

const getAllAccounts = (callback) => {
  const db = new sqlite3.Database(requireRootPage('data','database.db'));
  const sql = 'SELECT * FROM accounts';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });

  db.close();
};

module.exports = {
  getAllAccounts,
};