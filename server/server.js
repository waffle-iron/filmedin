var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var db = require('./db/helpers');
var app = express();
var auth = require('./auth')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', auth.signin);
app.post('/signup', auth.signup);

module.exports = app;