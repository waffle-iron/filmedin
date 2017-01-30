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

  profile: {
    get: function (id, cb) {
      db.query(`SELECT * FROM profile WHERE id = ${id}`, cb);
    },
    search: function (search, cb) {
      db.query(`SELECT * FROM profile WHERE firstName LIKE '%${search}%' OR lastName LIKE '%${search}%' OR concat(firstName, ' ', lastName) LIKE '%${search}%'`, cb);
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
      db.query(`SELECT p.firstName as firstName, p.lastName as lastName, p.DOB as DOB, p.id as ID FROM friends f inner join profile p on p.id = f.friendID and f.primaryID = ${id}`, cb);
    },
    exists: function (id, friendID, cb) {
      db.query(`SELECT * FROM friends where primaryID = ? and friendID = ?`, [id, friendID], cb);
    },
    post: function(primaryID, friendID, cb) {
      db.query(`INSERT INTO friends(primaryID, friendID) VALUES (?, ?)`, [primaryID, friendID], cb);
    }
  },
  rating: {
    get: function(id, cb) {
      db.query(`SELECT r.rating as rating, r.review as review, f.name as name, f.genre as genre, f.posterURL as posterURL from rating r INNER JOIN film f ON r.filmID = f.id where r.profileID = ${id}`, cb);
    },
    getFeed: function(id, cb) {
      db.query(`SELECT r.id as id, r.rating as rating, r.review as review, f.name as name, f.genre as genre, f.posterURL as posterURL from rating r INNER JOIN film f ON r.filmID = f.id where r.profileID in (SELECT friendID FROM friends where primaryID = ${id}) order by r.createdAt DESC LIMIT 100`, cb);
    },
    exists: function({profileID, filmID}, cb) {
      db.query(`SELECT * FROM rating where profileID = ? and filmID = ?`, [profileID, filmID], cb);
    },
    update: function({profileID, filmID, rating, review}, cb) {
      db.query(`UPDATE rating SET rating = ?, review = ?, createdAt = NOW() where profileID = ? and filmID = ?`, [rating, review, profileID, filmID], cb);
    },
    post: function({profileID, filmID, rating, review}, cb) {
      db.query(`INSERT INTO rating (profileID, filmID, rating, review) VALUES (?, ?, ?, ?)`, [profileID, filmID, rating, review], cb);
    }
  },

  film: {
    get: function (id, cb) {
      db.query(`SELECT * FROM film where guideBox = ${id}`, cb);
    },
    post: function ({guideBox, name, releaseDate, director, actor1, actor2, actor3, actor4, posterURL, runtime, genre}, cb) {
      db.query(`INSERT INTO film (guideBox, name, releaseDate, director, actor1, actor2, actor3, actor4, posterURL, runtime, genre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [guideBox, name, releaseDate, director, actor1, actor2, actor3, actor4, posterURL, runtime, genre], cb);
    }
  }
}
module.exports = dbObj;