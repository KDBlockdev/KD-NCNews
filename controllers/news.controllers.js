const topics = require("../db/data/test-data/topics");
const articles = require("../db/data/test-data/articles");
const { collectTopics, collectArticles } = require("../models/news.models");

const getMessage = (req, res) => {
  res.status(200).send({ message: "all ok" });
};

const getTopics = (req, res) => {
  collectTopics().then((topics) => res.status(200).send(topics));
};

const getArticles = (req, res) => {
  collectArticles().then((articles) => res.status(200).send(articles));
  console.log(articles)
};

module.exports = {
  getMessage,
  getTopics,
  getArticles,
};
