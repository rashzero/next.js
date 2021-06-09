const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

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

const news = [
  {
    id: 1,
    title: "news1",
    text: "Во-первых, для использования этой функции CSS, нам нужно было провести небольшой расчёт. Нам пришлось подсчитать, сколько мы получим, если общую ширину грида (100%) разделим на нужное число столбцов (4). Мы получили 25%. В этом примере расчёт довольно прост и не создает проблем, но и в более сложных примерах мы можем полностью избежать необходимости что-то рассчитывать и позволить браузеру сделать это за нас. У нас есть функция calc(), так что мы могли бы написать следующее: repeat(4, calc(100% / 4), но даже это немного странно, и в любом случае здесь есть еще одна проблема…",
    img: "https://altai-mitropolia.ru/www/news/2020/3/282054140676861.jpg",
  },
  {
    id: 2,
    title: "news2",
    text: "Во-первых, для использования этой функции CSS, нам нужно было провести небольшой расчёт. Нам пришлось подсчитать, сколько мы получим, если общую ширину грида (100%) разделим на нужное число столбцов (4). Мы получили 25%. В этом примере расчёт довольно прост и не создает проблем, но и в более сложных примерах мы можем полностью избежать необходимости что-то рассчитывать и позволить браузеру сделать это за нас. У нас есть функция calc(), так что мы могли бы написать следующее: repeat(4, calc(100% / 4), но даже это немного странно, и в любом случае здесь есть еще одна проблема…",
    img: "https://altai-mitropolia.ru/www/news/2020/3/282054140676861.jpg",
  },
];

app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  server.get("/api/users", (req, res) => {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(users));
  });

  server.get("/api/news", (req, res) => {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(news));
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

  server.delete(`/api/users`, (req, res) => {
    const { id } = req.body;
    const findUserIndex = users.findIndex((user) => user.id === +id);
    users.splice(findUserIndex, 1);
    res.send(JSON.stringify(users));
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
