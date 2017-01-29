var db = require('./db');

var dbObj =  {

  user: {
    get: function (username, cb) {
      db.query(`SELECT * FROM user WHERE username = "${username}"`, cb);
    },
    post: function (username, password, cb) {
      db.query(`INSERT INTO user (username, password) VALUES ("${username}", "${password}")`, cb);
    }
  },

  // users: {
  //   get: function () {

  //   },
  //   post: function (user) {

  //   }
  // },

  profile: {
    get: function (id, cb) {
      db.query(`SELECT * FROM profile WHERE id = ${id}`, cb);
    },
    getByUserID: function (userID, cb) {
      db.query(`SELECT * FROM profile WHERE userID = ${userID}`, cb);
    },
    post: function ({userID, firstName, lastName, DOB}) {
      db.query(`INSERT INTO profile (userID, firstName, lastName, DOB) VALUES (${userID}, "${firstName}", "${lastName}", "${DOB}"`);
    }
  },

  film: {
    get: function () {

    },
    post: function (film) {
      
    }
  }
}
module.exports = dbObj;