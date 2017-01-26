var mysql = require('mysql');

var db = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'filmedin'
});
db.connect();
module.exports = db;