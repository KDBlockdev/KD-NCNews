const topics = require("../db/data/test-data/topics");
const { collectTopics } = require("../models/news.models");

const getMessage = (req, res) => {
  res.status(200).send({ message: "all ok" });
};

const getTopics = (req, res) => {
  collectTopics().then((topics) => res.status(200).send(topics));
};

module.exports = {
  getMessage,
  getTopics,
};
