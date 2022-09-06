const express = require("express");
const app = express();
const {
  getMessage,
  getTopics,
  getArticleById,
  getUsers,
} = require("./controllers/news.controllers");

app.get("/api", getMessage);

app.get("/api/topics", getTopics);


module.exports = app;
