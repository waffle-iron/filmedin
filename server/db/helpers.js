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
      db.query(`SELECT p.*, u.username FROM profile p INNER JOIN user u on p.userID = u.id WHERE p.id = ${id}`, cb);
    },
    search: function (search, cb) {
      db.query(`SELECT * FROM profile WHERE firstName LIKE '%${search}%' OR lastName LIKE '%${search}%' OR concat(firstName, ' ', lastName) LIKE '%${search}%'`, cb);
    },
    getByUserID: function (userID, cb) {
      db.query(`SELECT p.*, u.username FROM profile p INNER JOIN user u on p.userID = u.id WHERE userID = ${userID}`, cb);
    },
    post: function (prof, cb) {
      db.query(`INSERT INTO profile (userID, firstName, lastName, DOB, email) VALUES (${prof.userID}, "${prof.firstName}", "${prof.lastName}", "${prof.DOB}", "${prof.email}")`, cb);
    },
    update: function(id, url, cb) {
      db.query(`UPDATE profile SET profileURL = ? WHERE id = ?`, [url, id], cb);
    }
  },
  friend: {
    get: function (id, cb) {
      db.query(`SELECT p.firstName as firstName, p.lastName as lastName, p.DOB as DOB, p.id as ID, u.username, count(r.filmID) as count FROM friends f inner join profile p on p.id = f.friendID and f.primaryID = ${id} inner join user u on u.id = p.userID left join rating r on r.profileID = p.id group by firstName, lastName, DOB, ID, username order by count desc`, cb);
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
      db.query(`SELECT r.filmID as filmID, r.rating as rating, r.review as review, f.name as name, f.genre as genre, f.posterURL as posterURL, f.guideBox as guideBox, f.releaseDate from rating r INNER JOIN film f ON r.filmID = f.id where r.profileID = ${id}`, cb);
    },
    getFeed: function(id, cb) {
      db.query(`SELECT p.*, r.id as ratingID, r.rating as rating, r.createdAt as rCreatedAt, r.review as review, f.id as filmID, f.name as name, f.genre as genre, f.posterURL as posterURL, f.guideBox as guideBox from rating r INNER JOIN film f ON r.filmID = f.id INNER JOIN profile p on p.id = r.profileID where r.profileID in (SELECT friendID FROM friends where primaryID = ${id}) order by r.createdAt DESC LIMIT 100`, cb);
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
    getRecs: function(userID, cb){
      // returns a list of all recs from all friends based on your diff score with all friends
      db.query(`SELECT recs.filmID as filmID, f.name as name, f.guideBox, f.releaseDate as releaseDate, f.genre as genre, f.posterURL as posterURL FROM rating recs JOIN film f on recs.filmID = f.id WHERE recs.rating >= 4 AND recs.filmID NOT IN (SELECT filmID FROM rating WHERE profileID = ${userID}) AND recs.profileID IN (SELECT profileID FROM (SELECT * FROM (SELECT (sum(ABS(r2.rating - (SELECT r1.rating from rating r1 where r1.profileID = ${userID} and r1.filmID = r2.filmID))) / (SELECT count(*) FROM rating myrating JOIN rating friendrating on myrating.filmID = friendrating.filmID where myrating.profileID = ${userID} and friendrating.profileID = r2.profileID)) as DiffScore, r2.profileID FROM rating r2 WHERE r2.filmID in (SELECT filmID from rating where profileID = ${userID}) AND r2.profileID in (SELECT friendID from friends where primaryID = ${userID}) group by r2.profileID) as diffTable WHERE DiffScore <= 2) as filteredDiffTable)`, cb)
    },
    getFriendsDifferences: function(userID, cb) {
      // returns a list of friends and their ratings diff score from you (diffScore = sum(absolute value of differences in ratings between you and the friend)/(total number of films you guys both built))
      db.query(`SELECT (sum(ABS(r2.rating - (SELECT r1.rating from rating r1 where r1.profileID = ${userID} and r1.filmID = r2.filmID))) / (SELECT count(*) FROM rating myrating JOIN rating friendrating on myrating.filmID = friendrating.filmID where myrating.profileID = ${userID} and friendrating.profileID = r2.profileID)) as DiffScore, r2.profileID FROM rating r2 WHERE r2.filmID in (SELECT filmID from rating where profileID = ${userID}) AND r2.profileID in (SELECT friendID from friends where primaryID = ${userID}) group by r2.profileID ORDER BY DiffScore`, cb)
    }
  },

  film: {
    get: function (id, cb) {
      db.query(`SELECT * FROM film where guideBox = ${id}`, cb);
    },
    post: function (film, cb) {
      db.query(`INSERT INTO film (guideBox, name, overview, releaseDate, directors, writers, actors, posterURL, trailer, runtime, rt, netflix, hbo, amazon, itunes, genre, imdb, wiki) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [film.guideBox, film.name, film.overview, film.releaseDate, film.directors, film.writers, film.actors, film.posterURL, film.trailer, film.runtime, film.rt, film.netflix, film.hbo, film.amazon, film.itunes, film.genre, film.imdb, film.wiki], cb);
    }
  }
}
module.exports = dbObj;