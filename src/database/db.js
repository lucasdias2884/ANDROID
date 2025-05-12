import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('estoque.db');

// Inicialização do banco com tratamento robusto
export function initDB() {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL
          );`,
          [],
          () => console.log('✅ Tabela "usuarios" verificada/criada'),
          (_, err) => console.error('❌ Erro ao criar/verificar "usuarios":', err)
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS bebidas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            quantidade INTEGER NOT NULL,
            preco REAL NOT NULL
          );`,
          [],
          () => console.log('✅ Tabela "bebidas" verificada/criada'),
          (_, err) => console.error('❌ Erro ao criar/verificar "bebidas":', err)
        );
      },
      error => {
        console.error('❌ Erro na transação ao criar tabelas:', error);
        reject(error);
      },
      () => {
        console.log('✅ Banco de dados inicializado corretamente');
        resolve();
      }
    );
  });
}

// ------------------ USUÁRIOS ------------------

export function cadastrarUsuario(nome, senha, sucesso, erro) {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO usuarios (nome, senha) VALUES (?, ?);',
      [nome, senha],
      (_, result) => sucesso(result),
      (_, err) => erro(err)
    );
  });
}

export function validarUsuario(nome, senha, sucesso, erro) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM usuarios WHERE nome = ? AND senha = ?;',
      [nome, senha],
      (_, { rows }) => sucesso(rows.length > 0),
      (_, err) => erro(err)
    );
  });
}

// ------------------ BEBIDAS ------------------

export function inserirBebida(nome, quantidade, preco, sucesso, erro) {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO bebidas (nome, quantidade, preco) VALUES (?, ?, ?);',
      [nome, quantidade, preco],
      (_, result) => sucesso(result),
      (_, err) => erro(err)
    );
  });
}

export function listarBebidas(sucesso, erro) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM bebidas;',
      [],
      (_, { rows }) => sucesso(rows._array),
      (_, err) => erro(err)
    );
  });
}

export function atualizarEstoque(id, novaQuantidade, sucesso, erro) {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE bebidas SET quantidade = ? WHERE id = ?;',
      [novaQuantidade, id],
      (_, result) => sucesso(result),
      (_, err) => erro(err)
    );
  });
}

export function buscarBebidaPorNome(nome, sucesso, erro) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM bebidas WHERE nome = ?;',
      [nome],
      (_, { rows }) => sucesso(rows.length > 0 ? rows._array[0] : null),
      (_, err) => erro(err)
    );
  });
}
