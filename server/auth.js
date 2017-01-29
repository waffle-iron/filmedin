var jwt = require('jwt-simple');
var db = require('./db/helpers');
//var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

module.exports = {

  signin: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;


    db.user.get(username, function(err, rows) {
      if (err) {
        next(new Error('Failed to connect to database'));
      }
      if (rows.length === 0) {
        next(new Error('User does not exist'));
      } else {
        var user = rows[0];
        bcrypt.compareAsync(password, user.password).then(result => {
          if (result) {
            var token = jwt.encode(user, 'secret');
            res.json({token: token});
          } else {
            next(new Error('Invalid password'));
          }
        }).catch (err => {
          next(new Error('Invalid password'));
        });
      }
    });
  },

  signup: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    db.user.get(username, function (err, rows) {
      if (err) {
        next(new Error('Failed to connect to database'));
      }
      if (rows.length !== 0) {
        next(new Error('User already exists'));
      } else {
         bcrypt.hashAsync(password, null, null)
          .then(function(hash) {
            db.user.post(username, hash, function (err, rows) {
              if (err) {
                next(new Error('Failed to create user'));
              } else {
                req.body.userID = rows.insertId;
                db.profile.post(req.body, function (err, rows) {
                  res.redirect(307, '/signin');
                });
                
              }
            });
          });
      }
    })
  },

  checkAuth: function (req, cb) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if ((token !== undefined) && (token !== 'undefined')) {
      var user = jwt.decode(token, 'secret');
      db.user.get(user.username, function (err, rows) {
        if (rows === 1) {
          cb(rows[0]);
        } else {
          cb(null);
        }
      });
    }
  }
};