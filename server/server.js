var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var db = require('./db/helpers');
var app = express();
var auth = require('./auth');
var routeHelpers = require('./routeHelpers');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors());
app.post('/signin', auth.signin);
app.post('/signup', auth.signup);
app.post('/friend', routeHelpers.addFriend);
app.post('/rating', routeHelpers.addRating);

app.get('/', routeHelpers.default);
app.get('/home', routeHelpers.home);
app.get('/profile/:id', routeHelpers.profile);
app.get('/film/:id', routeHelpers.film);
app.get('/feed', routeHelpers.feed);
app.get('/searchprofile/:id', routeHelpers.searchUser);
app.get('/searchfilm/:id', routeHelpers.searchFilm);

module.exports = app;