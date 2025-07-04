import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import type { SQLiteDBConnection } from "@capacitor-community/sqlite";
import type { workerType } from "../../Types/Types";

const sqlite = new SQLiteConnection(CapacitorSQLite);
let db: SQLiteDBConnection | null = null;

export const getDatabase = async () => {
  if (!db) {
    db = await sqlite.createConnection(
      "CafeGestor",
      false,
      "no-encryption",
      1,
      false
    );
    await db.open();

    // Crea la tabla si no existe
    await db.execute(`
      CREATE TABLE IF NOT EXISTS workers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        date TEXT NOT NULL,
        kilos INTEGER NOT NULL
      );
    `);
  }
  return db;
};

// 👉 INSERTAR UN TRABAJADOR
export const insertWorker = async (worker: workerType) => {
  const db = await getDatabase();
  await db.run(`INSERT INTO workers (name, date, kilos) VALUES (?, ?, ?)`, [
    worker.worker,
    worker.date,
    parseInt(worker.kilos),
  ]);
};

// 👉 LEER TODOS LOS TRABAJADORES
export const getAllWorkers = async (): Promise<workerType[]> => {
  const db = await getDatabase();
  const result = await db.query(
    `SELECT name as worker, date, kilos FROM workers`
  );
  return result.values ?? [];
};

// ACTUAZLIZAR TRABAJADOR
export const updateWorker = async () => {
  const db = await getDatabase();
  await db.run(`UPDATE workers SET kilos = ? WHERE name = ? AND date = ?`, [
    80,
    "Juan",
    "2025-07-04",
  ]);
};
