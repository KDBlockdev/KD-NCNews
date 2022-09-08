const express = require("express");
const app = express();
const {
  getMessage,
  getTopics,
  getArticleById,
  getUsers,
  patchArticleById,
} = require("./controllers/news.controllers");

const { updateArticleById } = require("./models/news.models");

app.use(express.json());

app.get("/api", getMessage);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/users", getUsers);

app.patch("/api/articles/:article_id", patchArticleById);


//Error Handling Middleware
// Standard Errors
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});
//PSQL thrown errors - 400
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  } else next(err);
});
//Custom Errors - 500
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
