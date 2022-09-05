const express = require("express");
const app = express();
const { getMessage, getTopics } = require("./controllers/news.controllers");
app.use(express.json());

app.get("/api", getMessage);

app.get("/api/topics", getTopics);

//app.post('');

//app.delete('');

//app.patch('');

module.exports = app;
