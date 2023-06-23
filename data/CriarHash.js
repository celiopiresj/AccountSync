const bcrypt = require('bcrypt');
const crypto = require('crypto');

const minhasenha = 'cpj142905'

bcrypt.hash(minhasenha, 10, (err, hash) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("minha senha: " + hash);
});

let algorithm = 'aes-256-cbc';
let keyCri = crypto.scryptSync(minhasenha, 'salt', 32);
let iv = Buffer.alloc(16, 0);


const id = "AIzaSyAydOdZeKBX_OHArKGGnOZOWkBdltolqfg"

let cipher = crypto.createCipheriv(algorithm, keyCri, iv);
let client_idEncrypted = cipher.update(id, 'utf8', 'hex');
client_idEncrypted += cipher.final('hex');

console.log("id: " + client_idEncrypted)

