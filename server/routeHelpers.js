var db = require('./db/helpers');
var auth = require('./auth');
var gb = require('./guideBoxHelpers');

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
  searchUser: function (req, res, next) {

  },
  searchFilm: function (req, res, next) {

  }
}