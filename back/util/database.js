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

export const getUser = (id) =>
  db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);

export const saveUser = (name, email, password) =>
  db
    .prepare(`INSERT INTO users (name, email, password) VALUES (?,?,?)`)
    .run(name, email, password);

export const updateUser = (id, name, email, password) =>
  db
    .prepare(`UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`)
    .run(name, email, password, id);

export const deleteUser = (id) =>
  db.prepare(`DELETE FROM users WHERE id = ?`).run(id);

const users = [
  {
    id: 1,
    name: "Kiss János",
    email: "example@gmail.com",
    password: "abcd1234",
  },
  {
    id: 2,
    name: "Nagy Éva",
    email: "example@gmail.com",
    password: "abcd1234",
  },
  {
    id: 3,
    name: "Tóth László",
    email: "example@gmail.com",
    password: "abcd1234",
  },
];

//for (const user of users) saveUser(user.name, user.email, user.password);
