var db = require('./db/helpers');
var auth = require('./auth');
var gb = require('./guideBoxHelpers');
var qs = require('querystring');

module.exports = {
  home: function (req, res, next) {
    auth.checkAuth(req, function (user) {
      if (user !== null) {
        db.profile.getByUserID(user.id, function (err, rows) {
          var profile = rows[0];
          db.friend.get(profile.id, function (err, rows) {
            profile.friends = rows;
            db.rating.get(profile.id, function (err, rows) {
              profile.ratings = rows;
              res.send(JSON.stringify(profile));
            });
          });
        });
      }
      
    });

  },
  profile: function (req, res, next) {
    auth.checkAuth(req, function (user) {
      if (user !== null) {
        db.profile.get(req.params.id, function (err, rows) {
          var profile = rows[0];
          db.friend.get(profile.id, function (err, rows) {
          profile.friends = rows;
            db.rating.get(profile.id, function (err, rows) {
              profile.ratings = rows;
              res.send(JSON.stringify(profile));
            });
          });
        });
      }
      
    });
    
  },
  film: function (req, res, next) {
    auth.checkAuth(req, function (user) {

      if (user !== null) {
        db.film.get(req.params.id, function (err, rows) {
          if (rows.length !== 0) {
            res.send(JSON.stringify(rows[0]));
          } else {
            //guidebox
            gb.get(req.params.id, (err, body) => {
              var movie = JSON.parse(body.body);
              var film = {};
              film.guideBox = movie.id;
              film.name = movie.title;
              film.releaseDate = movie.release_date;
              film.director = movie.directors[0].name;
              film.actor1 = movie.cast[0].name;
              film.actor2 = movie.cast[1].name;
              film.actor3 = movie.cast[2].name;
              film.actor4 = movie.cast[3].name;
              film.posterURL = movie.poster_120x171;
              film.runtime = (movie.duration / 60) + ' mins.';
              film.genre = movie.genres.map(genre => genre.title).join(' ');
              // console.log(film);
              db.film.post(film, function (err, rows) {
                console.log(err);
                film.id = rows.insertId;
                res.send(JSON.stringify(film));
              })
            });

          }
        })
      }
    });

  },
  addFriend: function (req, res, next) {
    auth.checkAuth(req, function(user) {
      if (user !== null) {
        db.profile.getByUserID(user.id, function (err, rows) { 
          db.friend.exists(rows[0].id, req.body.friendID, function (err, exists) {
            if (exists.length > 0) {
              res.end();
            } else {
              db.friend.post(rows[0].id, req.body.friendID, function (err, rows2) {
                db.friend.post(req.body.friendID, rows[0].id, function(err, rows3) {
                  res.end();
                });
              });
            }
          })
          
        });
      }
    });
  },
  addRating: function (req, res, next) {
    auth.checkAuth(req, function(user) {
      if (user !== null) {
        db.profile.getByUserID(user.id, function (err, rows) { 
          req.body.profileID = rows[0].id;
          db.rating.exists(req.body, function (err, exists) {
            if (exists.length > 0) {
              db.rating.update(req.body, function (err, rows) {
                res.end();
              });
            } else {
              db.rating.post(req.body, function (err, rows) {
                res.end();
              });
            }
          })

        });
      }
    });
  },
  searchUser: function (req, res, next) {
    auth.checkAuth(req, function(user) {
      if (user !== null) {
        db.profile.search(req.params.search, function (err, rows) {
          res.send(rows);
        });
      }
    });
  },
  searchFilm: function (req, res, next) {
    auth.checkAuth(req, function(user) {
      if (user !== null) {
        gb.search(qs.parse(req.params.search), function (err, body) {
          res.send(JSON.parse(body.body).results);
        });
      }
    });
  }
}