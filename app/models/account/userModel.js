const sqlite3 = require('sqlite3').verbose();
const Routes = require('../../routes.js');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const requireRootPage = Routes.requireRootPage;

class UserModel{

    isAuthenticated(){
        return this.email === ""
    }

    getUser(email, password, callback) {

        const db = new sqlite3.Database(requireRootPage('data', 'database.db'));
        const sql = 'SELECT * FROM user WHERE email = ?';
      
        db.all(sql, [email], (err, rows) => {
          if (err) {
            console.error(err);
            callback(err, null);
          } else {
            if(rows.length > 0){
              const hashPassword = rows[0].password
              bcrypt.compare(password, hashPassword, (err, result) => {
                if (err) {
                  console.error(err);
                  return;
                }
            
                if (result) {
                  let {name, api_key, client_id, password: passwordHash } = rows[0]
    
                  const algorithm = 'aes-256-cbc';
                  const key = crypto.scryptSync(password, 'salt', 32);
                  const iv = Buffer.alloc(16, 0);
    
                  let decipher = crypto.createDecipheriv(algorithm, key, iv);
                  api_key = decipher.update(api_key, 'hex', 'utf8');
                  api_key += decipher.final('utf8');
    
                  decipher = crypto.createDecipheriv(algorithm, key, iv);
                  client_id = decipher.update(client_id, 'hex', 'utf8');
                  client_id += decipher.final('utf8');
    
                  const returnResult = {
                    "error": {
                      "code": 200,
                      "message": "Ok",
                      "details": "Nenhum erro encontrado."
                    },
                    name,
                    passwordHash,
                    email,
                    api_key,
                    client_id
                  }
                  callback(null, returnResult);
                } else {
                  const returnResult = {
                    "error": {
                      "code": 401,
                      "message": "Unauthorized",
                      "details": "A senha fornecida é inválida."
                    }
                  }
                  callback(null, returnResult);
                }
              });
            
            }
            else {
              const returnResult = {
                "error": {
                  "code": 404,
                  "message": "Not Found",
                  "details": "O usuário solicitado não foi encontrado."
                }
              }
              callback(null, returnResult);
            }
           
          }
        });
      
        db.close();
      }
}

module.exports = new UserModel();
