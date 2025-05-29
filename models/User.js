// models/User.js
const db = require('../config/db');

const User = {
  findByUsername: (username, callback) => {
    const sql = 'SELECT * FROM user WHERE username = ? LIMIT 1';
    db.query(sql, [username], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]);
    });
  }
};

module.exports = User;
