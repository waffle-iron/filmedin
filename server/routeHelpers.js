var db = require('./db/helpers');
var auth = require('./auth');
var gb = require('./guideBoxHelpers');
var qs = require('querystring');
var rec = require('./recHelpers');
var _  = require('underscore');
module.exports = {
  default: function(req, res, next) {
    res.end();
  },
  home: function (req, res, next) {
    auth.checkAuth(req, user => {
      if (user !== null) {
        db.profile.getByUserID(user.id, (err, rows) => {
          if (err) {
            console.log('home -> profile.getByUserID', err);
          }
          var profile = rows[0];
          db.friend.get(profile.id, (err, rows) => {
            if (err) {
              console.log('home -> friend.get', err);
            }
            profile.friends = rows;
            db.rating.get(profile.id, (err, rows) => {
              if (err) {
                console.log('home -> rating.get', err);
              }
              profile.ratings = rows;
              db.rating.getAllFriendsRatings(_.pluck(profile.friends, 'ID'), (err, rows) => {
                if (err){
                  console.log('home -> rating.getAllFriendsRatings', err);
                }
                // use rows results and feed into recommendations algorithim
                var myRatings = {};
                _.each(profile.ratings, (rating) => {myRatings[rating.filmID] = rating.rating});

                var allRatingsByAllFriends = {};
                _.each(rows, (rating) => {
                  if (!allRatingsByAllFriends[rating.profileID]) {
                    allRatingsByAllFriends[rating.profileID] = {}
                  }
                  // allRatingsByAllFriends[rating.profileID] = {}
                  allRatingsByAllFriends[rating.profileID][rating.filmID] = rating.rating;
                })

                console.log('rows', rows)
                console.log('allRatingsByAllFriends', allRatingsByAllFriends)
                console.log('myRatings', myRatings)
                profile.rec = rec.generateAllFriendsRecs(myRatings, allRatingsByAllFriends)
                // profile.recs = rows;
                res.send(JSON.stringify(profile));
              })
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
          if (err) {
            console.log('profile -> profile.get', err);
          }
          var profile = rows[0];
          db.friend.get(profile.id, (err, rows) => {
            if (err) {
              console.log('profile -> friend.get', err);
            }
            profile.friends = rows;
            db.rating.get(profile.id, (err, rows) => {
              if (err) {
                console.log('profile -> rating.get', err);
              }
              profile.ratings = rows;


              // //nick added this - probably mostly wrong
              // var myRatings = {};
              // _.each(profile.ratings, (rating) => {myRatings[rating.filmID] = rating.rating});
              // var allRatingsByAllFriends = {};
              // _.each(rows, (rating) => {
              //   allRatingsByAllFriends[rating.profileID] = {}
              //   allRatingsByAllFriends[rating.profileID][rating.filmID] = rating.rating;
              // })
              // // end of this line probably wrong
              // //profile.rec is all recs, want rec[friend]. Is profileID the right field for this?
              // profile.rec = rec.generateAllFriendsRecs(myRatings, allRatingsByAllFriends)[profileID]

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
        db.film.get(req.params.id, (err, films) => {
          if (err) {
            console.log('film -> film.get', err);
          }
          if (films.length !== 0) {
            var film = films[0];
            db.profile.getByUserID(user.id, (err, profiles) => {
              if (err) {
                console.log('film -> profile.getByUserID', err);
              }
              var profile = profiles[0];
              db.rating.friendGet(profile.id, film.id, (err, ratings) => {
                if (err) {
                  console.log('film -> profile.friendGet', err);
                }
                film.friendRatings = ratings;
                db.rating.myGet(profile.id, film.id, (err, myRatings) => {
                  if (err) {
                    console.log('film -> profile.myGet', err);
                  }
                  // film.myRating = {};
                  film.myRating = (myRatings.length !== 0) ? myRatings[0] : {};
                  console.log('myRatings', myRatings)
                  console.log('film.myRating', film.myRating)
                  //add 'suggested': true/false property to film


                  res.send(JSON.stringify(film));
                });

              })
            });
          } else {
            //guidebox
            gb.get(req.params.id, (err, body) => {
              if (err) {
                console.log('film -> gb.get', err);
              }
              var movie = JSON.parse(body.body);
              console.log('film -> gb.get -> body', movie);
              var film = {};
              film.guideBox = movie.id;
              film.name = movie.title;
              film.overview = movie.overview;
              film.releaseDate = movie.release_date;
              film.directors = movie.directors.map(director => (director.name)).join(', ');
              film.writers = movie.writers.map(writer => (writer.name)).join(', ');
              film.actors = movie.cast.map(actor => (actor.name + ':' + actor.character_name)).join(';');
              film.posterURL = movie.poster_120x171;
              film.trailer = movie.trailers.web[0] ? movie.trailers.web[0].embed : '';
              film.runtime = (movie.duration / 60) + ' mins.';
              film.rt = movie.rottentomatoes;
              var source = movie.subscription_web_sources.find(source => {return (source.source === 'netflix')});
              film.netflix = source ? source.link : '';
              source = movie.subscription_web_sources.find(source => {return (source.source === 'hbo_now')});
              film.hbo = source ? source.link : '';
              source = movie.subscription_web_sources.find(source => {return (source.source.includes('amazon'))});
              film.amazon = source ? source.link : '';
              source = movie.purchase_web_sources.find(source => {return (source.source === 'itunes')});
              film.itunes = source ? source.link : '';
              film.genre = movie.genres.map(genre => genre.title).join(' ');
              // console.log(film);
              db.film.post(film, (err, rows) => {
                if (err) {
                  console.log('film -> film.post', err);
                }
                film.id = rows.insertId;
                film.friendRatings = [];
                film.myRating = {};
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
          if (err) {
            console.log('feed -> profile.getByUserID', err);
          }
          db.rating.getFeed(rows[0].id, (err, rows) => {
            if (err) {
              console.log('feed -> rating.getFeed', err);
            }
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
          if (err) {
            console.log('addFriend -> profile.getByUserID', err);
          }
          db.friend.exists(rows[0].id, req.body.friendID, (err, exists) => {
            if (err) {
              console.log('addFriend -> friend.exists', err);
            }
            if (exists.length > 0) {
              res.end();
            } else {
              db.friend.post(rows[0].id, req.body.friendID, (err, rows2) => {
                if (err) {
                  console.log('addFriend -> friend.post', err);
                }
                db.friend.post(req.body.friendID, rows[0].id, (err, rows3) => {
                  if (err) {
                    console.log('addFriend -> friend.post', err);
                  }
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
        db.profile.getByUserID(user.id, (err, rows)  => {
          if (err) {
            console.log('addRating -> profile.getByUserID', err);
          }
          req.body.profileID = rows[0].id;
          db.rating.exists(req.body, (err, exists) => {
            if (err) {
              console.log('addRating -> rating.exists', err);
            }
            if (exists.length > 0) {
              db.rating.update(req.body, (err, rows) => {
                if (err) {
                  console.log('addRating -> rating.update', err);
                }
                res.end();
              });
            } else {
              db.rating.post(req.body, (err, rows) => {
                if (err) {
                  console.log('addRating -> rating.post', err);
                }
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
          if (err) {
            console.log('searchUser -> profile.search', err);
          }
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
          if (err) {
            console.log('searchFilm -> gb.search', err);
          }
          res.send(JSON.parse(body.body).results);
        });
      } else {
        next(new Error('Invalid credentials'));
      }
    });
  }
}