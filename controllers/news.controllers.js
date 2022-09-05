const topics = require("../db/data/test-data/topics");
const articles = require("../db/data/test-data/articles");
const users = require("../db/data/test-data/users");
const { collectTopics, collectArticles, collectUsers } = require("../models/news.models");

const getMessage = (req, res) => {
  res.status(200).send({ message: "all ok" });
};

const getTopics = (req, res) => {
  collectTopics().then((topics) => res.status(200).send(topics));
};

const getArticles = (req, res) => {
  collectArticles().then((articles) => res.status(200).send(articles));
};

const getUsers = (req, res) => {
    collectUsers().then((users) => res.status(200).send(users));
    console.log(users)
  };

module.exports = {
  getMessage,
  getTopics,
  getArticles,
  getUsers,
};
