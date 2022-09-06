const db = require("../db/connection");

exports.collectTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => result.rows);
};

exports.collectArticles = () => {
  return db.query("SELECT * FROM articles");
};

exports.collectArticleById = (article_id) => {
    return db.query("SELECT * FROM articles WHERE article_id = $1;", [article_id]).then((result) => result.rows[0]);
  };

