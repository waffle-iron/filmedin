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
    post: function ({userID, firstName, lastName, DOB}, cb) {
      db.query(`INSERT INTO profile (userID, firstName, lastName, DOB) VALUES (${userID}, "${firstName}", "${lastName}", "${DOB}")`, cb);
    }
  },
  friend: {
    get: function (id, cb) {
      db.query(`SELECT p.firstName as firstName, p.lastName as lastName, p.DOB as DOB FROM friends f inner join profile p on p.id = f.friendID and f.primaryID = ${id}`, cb);
    }
  },
  rating: {
    get: function(id, cb) {
      db.query(`SELECT r.rating as rating, r.review as review, f.name as name, f.genre as genre, f.posterURL as posterURL from rating r INNER JOIN film f ON r.filmID = f.id where r.profileID = ${id}`, cb);
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