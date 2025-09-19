import express from "express";
import cors from "cors";
import * as db from "./util/database.js";
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  try {
    const users = db.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});

app.get("/users/:id", (req, res) => {
  try {
    const user = db.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found! " });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});

app.post("/users/byEmail", (req, res) => {
  try {
    const user = db.getUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({ message: "User not found! " });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});

app.post("/users", (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Invalid credentials! " });
    }
    const saveUser = db.saveUser(name, email, password);
    if (saveUser.changes != 1) {
      return res.status(501).json({ message: "User save failed! " });
    }
    res.status(200).json({ id: saveUser.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});

app.put("/users/:id", (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Invalid credentials! " });
    }
    const updateUser = db.updateUser(req.params.id, name, email, password);
    if (updateUser.changes != 1) {
      return res.status(501).json({ message: "User update failed! " });
    }
    res.status(200).json({ name, email, password });
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});

app.delete("/users/:id", (req, res) => {
  try {
    const deletedUser = db.deleteUser(req.params.id);
    if (deletedUser.changes != 1) {
      return res.status(501).json({ message: "User delete failed! " });
    }
    res.status(200).json({ message: "Deleted successfuly! " });
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});

app.listen(PORT, () => {
  console.log(`server runs on http://localhost:${PORT}`);
});
