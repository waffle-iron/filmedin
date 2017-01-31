var mysql = require('mysql');

var db_config = {
  connectionLimit: 10,
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'bd93d2c16741f2',
  password: '70b3331d',
  database: 'heroku_a82769b4f508eba'
}

var pool = mysql.createPool(db_config);
// var db = mysql.createConnection({
//   host: 'us-cdbr-iron-east-04.cleardb.net',
//   user: 'b03d6fc9041b73',
//   password: '322391ba',
//   database: 'heroku_a64cb1e31ae9e38'
// });
// db.connect();
module.exports = pool;