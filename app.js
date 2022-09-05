const express = require("express");
const app = express();
const { getMessage, getTopics, getArticles } = require("./controllers/news.controllers");

app.get("/api", getMessage);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

//app.post('');

//app.delete('');

//app.patch('');

module.exports = app;
