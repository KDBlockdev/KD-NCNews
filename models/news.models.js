const db = require("../db/connection");

exports.collectTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => result.rows);
};

exports.collectArticles = () => {
  return db.query("SELECT * FROM articles;").then((result) => result.rows);
};

exports.collectUsers = () => {
  return db.query("SELECT * FROM users;").then((result) => result.rows);
};
