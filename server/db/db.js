var mysql = require('mysql');

var db = mysql.createConnection({
  user: 'root',
  password: 'abcd',
  database: 'filmedin'
});
db.connect();
module.exports = db;