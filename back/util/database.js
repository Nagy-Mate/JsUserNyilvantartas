import Database from "better-sqlite3";

const db = new Database("./data/database.sqlite");

db.prepare(
  `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT)`
).run();

export const getUsers = () => db.prepare(`SELECT * FROM users`).all();

export const getUser = () =>
  db.prepare(`SELECT * FORM users WHERE id = ?`).get(id);

export const saveUser = (name, email, password) =>
  db
    .prepare(`INSERT INTO users (name, email, password) VALUES (?,?,?)`)
    .run(name, email, password);

export const updateUser = (id, name, email, password) =>
  db
    .prepare(`UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`)
    .run(name, email, password, id);

export const deleteUser = (id) =>
  db.prepare(`DELETE FROM users WHERE id = ?`).run();

const users = [
  {
    id: 1,
    name: "Kiss János",
    email: "Debrecen, Alma utca 10.",
    password: 11111111,
  },
  {
    id: 2,
    name: "Nagy Éva",
    email: "Győr, Körte utca 22.",
    password: 22222222,
  },
  {
    id: 3,
    name: "Tóth László",
    email: "Szeged, Barackos út 5.",
    password: 33333333,
  },
];
