import Database from 'better-sqlite3';
import path from 'path';

//caminho para o banco de dados
const dbPath = path.join(process.cwd(), 'banco de dados', 'spotiguinho.sqlite');

//criacao do banco de dados
const db = new Database(dbPath, { verbose: console.log });

// Cria a tabela se ela não existir
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`).run();

export default db;