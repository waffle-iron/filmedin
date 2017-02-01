var db = require('./db/helpers');
var auth = require('./auth');
var gb = require('./guideBoxHelpers');
var qs = require('querystring');

module.exports = {
  default: function(req, res, next) {
    res.end();
  },
  home: function (req, res, next) {
    auth.checkAuth(req, user => {
      if (user !== null) {
        db.profile.getByUserID(user.id, (err, rows) => {
          var profile = rows[0];
          db.friend.get(profile.id, (err, rows) => {
            profile.friends = rows;
            db.rating.get(profile.id, (err, rows) => {
              profile.ratings = rows;
              res.send(JSON.stringify(profile));
            });
          });
        });
      } else {
        next(new Error('Invalid credentials'));
      }
    });
  },
  profile: function (req, res, next) {
    auth.checkAuth(req, user => {
      if (user !== null) {
        db.profile.get(req.params.id, (err, rows) => {
          var profile = rows[0];
          db.friend.get(profile.id, (err, rows) => {
          profile.friends = rows;
            db.rating.get(profile.id, (err, rows) => {
              profile.ratings = rows;
              res.send(JSON.stringify(profile));
            });
          });
        });
      } else {
        next(new Error('Invalid credentials'));
      }   
    });
  },
  film: function (req, res, next) {
    auth.checkAuth(req, user => {
      if (user !== null) {
        db.film.get(req.params.id, (err, rows) => {
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
              db.film.post(film, (err, rows) => {
                film.id = rows.insertId;
                res.send(JSON.stringify(film));
              })
            });

          }
        })
      } else {
        next(new Error('Invalid credentials'));
      }
    });

  },
  feed: function(req, res, next) {
    auth.checkAuth(req, user => {
      if (user !== null) {
        db.profile.getByUserID(user.id, (err, rows) => {
          db.rating.getFeed(rows[0].id, (err, rows) => {
            res.send(JSON.stringify(rows));
          });
        });
      } else {
        next(new Error('Invalid credentials'));
      }
    })
  },
  addFriend: function (req, res, next) {
    auth.checkAuth(req, user => {
      if (user !== null) {
        db.profile.getByUserID(user.id, (err, rows) => { 
          db.friend.exists(rows[0].id, req.body.friendID, (err, exists) => {
            if (exists.length > 0) {
              res.end();
            } else {
              db.friend.post(rows[0].id, req.body.friendID, (err, rows2) => {
                db.friend.post(req.body.friendID, rows[0].id, (err, rows3) => {
                  res.end();
                });
              });
            }
          })
          
        });
      } else {
        next(new Error('Invalid credentials'));
      }
    });
  },
  addRating: function (req, res, next) {
    auth.checkAuth(req, user  => {
      if (user !== null) {
        db.profile.getByUserID(user.id, err, rows  => { 
          req.body.profileID = rows[0].id;
          db.rating.exists(req.body, (err, exists) => {
            if (exists.length > 0) {
              db.rating.update(req.body, (err, rows) => {
                res.end();
              });
            } else {
              db.rating.post(req.body, (err, rows) => {
                res.end();
              });
            }
          })

        });
      } else {
        next(new Error('Invalid credentials'));
      }
    });
  },
  searchUser: function (req, res, next) {
    auth.checkAuth(req, user => {
      if (user !== null) {
        db.profile.search(req.params.id, (err, rows) => {
          res.send(rows);
        });
      } else {
        next(new Error('Invalid credentials'));
      }
    });
  },
  searchFilm: function (req, res, next) {
    auth.checkAuth(req, user => {
      if (user !== null) {
        gb.search(req.params.id, (err, body) => {
          res.send(JSON.parse(body.body).results);
        });
      } else {
        next(new Error('Invalid credentials'));
      }
    });
  }
}