const SQLite = require('react-native-sqlite-storage');

// Abre o banco de dados
const db = SQLite.openDatabase(
  { name: 'financasoncontrol.db', location: 'default' },
  () => {},
  error => { console.error('Erro ao abrir o banco de dados:', error); }
);

// Inicializa o banco de dados com as tabelas necessárias
db.transaction(tx => {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      amount REAL,
      category TEXT,
      date TEXT,
      type TEXT
    );`
  );
});

// Função para inserir uma nova transação no banco de dados
function insertTransaction(description, amount, category, date, type) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO transactions (description, amount, category, date, type) 
        VALUES (?, ?, ?, ?, ?);`,
        [description, amount, category, date, type],
        (_, { insertId }) => resolve(insertId),
        (_, error) => reject(error)
      );
    });
  });
}

// Função para recuperar todas as transações do banco de dados
function getAllTransactions() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM transactions;`,
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
}

// Função para atualizar uma transação no banco de dados
function updateTransaction(id, description, amount, category, date, type) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE transactions 
        SET description = ?, amount = ?, category = ?, date = ?, type = ? 
        WHERE id = ?;`,
        [description, amount, category, date, type, id],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
}

// Função para deletar uma transação do banco de dados
function deleteTransaction(id) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM transactions WHERE id = ?;`,
        [id],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
}

module.exports = {
  insertTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction
};