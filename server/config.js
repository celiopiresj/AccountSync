const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function connectToDatabase(caminhoArquivo) {
  // Cria uma nova instância do banco de dados
  const db = new sqlite3.Database(caminhoArquivo);

  return {
    executeSQLCommands: function(comandosSQL) {
      // Execute comandos SQL
      db.serialize(() => {
        comandosSQL.forEach((comando) => {
          db.run(comando, function(err) {
            if (err) {
              console.error(err.message);
            } else {
              console.log(`Comando executado com sucesso: ${comando}`);
            }
          });
        });
      });
    },
    closeConnection: function() {
      // Fecha a conexão com o banco de dados
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Conexão com o banco de dados fechada.');
      });
    }
  };
}

// Exemplo de uso
const db = connectToDatabase(path.join(__dirname, '..', 'data','database.db'));

// Executar comandos SQL
db.executeSQLCommands([
  "CREATE TABLE IF NOT EXISTS usuarios (id INT, nome TEXT)",
  "INSERT INTO usuarios (id, nome) VALUES (1, 'João')",
  "INSERT INTO usuarios (id, nome) VALUES (2, 'Maria')",
  "SELECT * FROM usuarios"
]);

// Fechar a conexão com o banco de dados quando terminar de usá-lo
db.closeConnection();