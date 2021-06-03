const cors = require("cors");
const express = require("express");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.options("*", cors());

const users = [
  {
    id: 1,
    name: "Tom",
  },
  {
    id: 2,
    name: "Pol",
  },
];

app.get("/api/users", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(users));
});

app.post("/api/users", (req, res) => {
  const { name } = req.body;
  users.push({
    name,
    id: users[users.length - 1].id + 1,
  });
  res.send(JSON.stringify(users));
});

app.get(`/api/users/:id`, (req, res) => {
  const id = req.params.id;
  const findUser = users.find((user) => user.id === +id);
  res.send(JSON.stringify(findUser));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
