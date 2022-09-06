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

app.get("/api/articles/:article_id", getArticleById);

//Error Handling Middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Server Error!");
});

//app.post('');

//app.delete('');

//app.patch('');

module.exports = app;
