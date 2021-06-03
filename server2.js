const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

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

app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  server.get("/api/users", (req, res) => {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(users));
  });

  server.post("/api/users", (req, res) => {
    const { name } = req.body;
    users.push({
      name,
      id: users[users.length - 1].id + 1,
    });
    res.send(JSON.stringify(users));
  });

  server.get(`/api/users/:id`, (req, res) => {
    const id = req.params.id;
    const findUser = users.find((user) => user.id === +id);
    res.send(JSON.stringify(findUser));
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
