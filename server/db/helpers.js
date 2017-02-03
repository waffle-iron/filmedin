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
    post: function (prof, cb) {
      db.query(`INSERT INTO profile (userID, firstName, lastName, DOB) VALUES (${prof.userID}, "${prof.firstName}", "${prof.lastName}", "${prof.DOB}")`, cb);
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
      db.query(`SELECT r.filmID as filmID, r.rating as rating, r.review as review, f.name as name, f.genre as genre, f.posterURL as posterURL, f.guideBox as guideBox from rating r INNER JOIN film f ON r.filmID = f.id where r.profileID = ${id}`, cb);
    },
    getFeed: function(id, cb) {
      db.query(`SELECT r.id as id, r.rating as rating, r.review as review, f.name as name, f.genre as genre, f.posterURL as posterURL, f.guideBox as guideBox from rating r INNER JOIN film f ON r.filmID = f.id where r.profileID in (SELECT friendID FROM friends where primaryID = ${id}) order by r.createdAt DESC LIMIT 100`, cb);
    },
    exists: function(rating, cb) {
      db.query(`SELECT * FROM rating where profileID = ? and filmID = ?`, [rating.profileID, rating.filmID], cb);
    },
    update: function(rating, cb) {
      db.query(`UPDATE rating SET rating = ?, review = ?, createdAt = NOW() where profileID = ? and filmID = ?`, [rating.rating, rating.review, rating.profileID, rating.filmID], cb);
    },
    post: function(rating, cb) {
      db.query(`INSERT INTO rating (profileID, filmID, rating, review) VALUES (?, ?, ?, ?)`, [rating.profileID, rating.filmID, rating.rating, rating.review], cb);
    },
    friendGet: function(id, filmID, cb) {
      db.query(`SELECT r.rating, r.review, r.profileID, p.firstName, p.lastName FROM rating r INNER JOIN profile p on r.profileID = p.id INNER JOIN friends ON p.id = friends.friendID and friends.primaryID = ${id} where r.filmID = ${filmID}`, cb);
    },
    myGet: function(id, filmID, cb) {
      db.query(`SELECT r.rating, r.review FROM rating r where r.profileID = ${id} and r.filmID = ${filmID}`, cb);
    },
    getAllFriendsRatings: function(friendIDs, cb) {
      friendIDs = friendIDs.join(',');
      db.query(`SELECT r.profileID as profileID, r.filmID as filmID, r.rating as rating, f.name as name, f.genre as genre, f.posterURL as posterURL, f.guideBox as guideBox FROM rating r INNER JOIN film f on r.filmID = f.id where r.profileID in (${friendIDs})`, cb)
    },
    getRecs: function(results, friendIDs, cb){

      // db.query('stuff', function() {
      //   //push the results to results
      //   //subtract last friend from friendIDs
      //   //if friendIDs is empty, then run the cb
      //   rating.getRecs(results, friendIDs, cb);
      // }
    }
  },

  film: {
    get: function (id, cb) {
      db.query(`SELECT * FROM film where guideBox = ${id}`, cb);
    },
    post: function (film, cb) {
      db.query(`INSERT INTO film (guideBox, name, overview, releaseDate, directors, writers, actors, posterURL, trailer, runtime, rt, netflix, hbo, amazon, itunes, genre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [film.guideBox, film.name, film.overview, film.releaseDate, film.directors, film.writers, film.actors, film.posterURL, film.trailer, film.runtime, film.rt, film.netflix, film.hbo, film.amazon, film.itunes, film.genre], cb);
    }
  }
}
module.exports = dbObj;