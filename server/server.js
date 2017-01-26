var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var db = require('./db/helpers');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));