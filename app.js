const express = require("express");
const app = express();
const {
  getMessage,
  getTopics,
  getArticles,
  getUsers,
} = require("./controllers/news.controllers");

app.get("/api", getMessage);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

//app.delete('');

//app.patch('');

module.exports = app;
