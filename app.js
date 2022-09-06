const express = require("express");
const app = express();
const {
  getMessage,
  getTopics,
  getArticles,
  getArticleById,
} = require("./controllers/news.controllers");

app.get("/api", getMessage);

app.get("/api/topics", getTopics);


module.exports = app;
