import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let dbInstance = null;

export async function openDb() {
  try {
    if (!dbInstance) {
      dbInstance = await open({
        filename: './database.db',
        driver: sqlite3.Database
      });
    }
    return dbInstance;
  } catch (error) {
    console.error("Erro ao abrir o banco de dados:", error);
    throw new Error("Falha na conexão com o banco de dados");
  }
}
