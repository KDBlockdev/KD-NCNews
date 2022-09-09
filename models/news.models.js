const { query } = require("../db/connection");
const db = require("../db/connection");

exports.collectTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => result.rows);
};

exports.collectArticleById = (article_id) => {
  return db
    .query(
      `
    SELECT articles.*, 
           CAST(COUNT(comments.comment_id) as INT) as comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id
    `,
      [article_id]
    )
    .then(({ rows }) => {
      const article = rows[0];
      console.log(article)
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${article_id}`,
        });
      }
      return article;
    });
};

exports.collectUsers = () => {
  return db.query("SELECT * FROM users;").then((result) => result.rows);
};

exports.updateArticleById = (article_id, inc_votes) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
      [inc_votes, article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else {
        return result.rows[0];
      }
    });
};

exports.collectArticles = () => {
  return db.query("SELECT * FROM articles").then((result) => result.rows);
};
