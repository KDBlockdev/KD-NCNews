const topics = require("../db/data/test-data/topics");
const articles = require("../db/data/test-data/articles");
const { collectTopics, collectArticleById, collectUsers } = require("../models/news.models");

const getMessage = (req, res) => {
  res.status(200).send({ message: "all ok" });
};

const getTopics = (req, res) => {
  collectTopics().then((topics) => res.status(200).send(topics));
};

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  collectArticleById(article_id)
    .then((article) => res.status(200).send({ article }))
    .catch(next);
};

const getUsers = (req, res) => {
    collectUsers().then((users) => res.status(200).send(users));
  };

module.exports = {
  getMessage,
  getTopics,
  getArticleById,
  getUsers,
};
