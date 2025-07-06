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

    await db.execute(`
      CREATE TABLE IF NOT EXISTS preciokg (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
       preciokg  REAL NOT NULL
      );
    `);
  }
  return db;
};

//INSERTAR PRECIO GLOBAL DE KG
export const insertKg = async (precio: string) => {
  const db = await getDatabase();
  await db.run(`INSERT INTO preciokg (preciokg) VALUES (?)`, [
    parseFloat(precio),
  ]);
};


//LEER PRECIO DE KG
export const getPrecieKg = async () => {
  const db = await getDatabase();
  const result = await db.query(
  `SELECT preciokg FROM preciokg ORDER BY id DESC LIMIT 1`
);
 
  return result.values?.[0]?.preciokg ?? null;
};



//  INSERTAR UN TRABAJADOR
export const insertWorker = async (worker: workerType) => {
  const db = await getDatabase();
  await db.run(`INSERT INTO workers (name, date, kilos) VALUES (?, ?, ?)`, [
    worker.worker,
    worker.date,
    parseInt(worker.kilos),
  ]);
};

//  LEER TODOS LOS TRABAJADORES
export const getAllWorkers = async (): Promise<workerType[]> => {
  const db = await getDatabase();
  const result = await db.query(
    `SELECT name as worker, date, kilos FROM workers`
  );
  return result.values ?? [];
};

// ACTUAZLIZAR TRABAJADOR
export const updateWorker = async (
  field: string,
  value: string | number,
  name: string,
  date: string
) => {
  const db = await getDatabase();
  const query = `UPDATE workers SET ${field} = ? WHERE name = ? AND date = ?`;

  //   await db.run(query, [value, name, date]);
  const result = await db.run(query, [value, name, date]);
  console.log("Filas actualizadas:", result.changes);
};
