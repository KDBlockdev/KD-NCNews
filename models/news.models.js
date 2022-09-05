const db = require("../db/connection");

exports.collectTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => result.rows);
};

exports.collectArticles = () => {
  return db.query("SELECT * FROM articles ORDER BY primary_key_of(articles);").then((result) => result.rows);
};

