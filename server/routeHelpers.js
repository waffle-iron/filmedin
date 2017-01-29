var db = require('./db/helpers');
var auth = require('./auth');

module.exports = {
  home: function (req, res, next) {
    auth.checkAuth(req, function (user) {
      db.profile.getByUserID(user.id, function (err, rows) {
        var profile = rows[0];
        db.friend.get(profile.id, function (err, rows) {
          profile.friends = rows;
          db.rating.get(profile.id, function (err, rows) {
            console.log(err);
            console.log(rows);
            profile.ratings = rows;
            res.send(JSON.stringify(profile));
          });
        });
      });
    });

  },
  friend: function (req, res, next) {

  },
  film: function (req, res, next) {

  },
  searchUser: function (req, res, next) {

  },
  searchFilm: function (req, res, next) {

  }
}