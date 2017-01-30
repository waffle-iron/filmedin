var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var db = require('./db/helpers');
var app = express();
var auth = require('./auth');
var routeHelpers = require('./routeHelpers');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', auth.signin);
app.post('/signup', auth.signup);
app.post('/friend', routeHelpers.addFriend);
app.post('/rating', routeHelpers.addRating);

app.get('/home', routeHelpers.home);
app.get('/profile/:id', routeHelpers.profile);
app.get('/film/:id', routeHelpers.film);
app.get('/search/profile/:search', routeHelpers.searchUser);
app.get('/search/film/:search', routeHelpers.searchFilm);

module.exports = app;