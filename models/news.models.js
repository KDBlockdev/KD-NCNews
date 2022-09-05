const db = require('../db/connection.js');

exports.collectTopics = () => {
  return db.query("SELECT * FROM topics;").then((result) => result.rows);
};
