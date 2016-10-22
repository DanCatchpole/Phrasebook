#!/usr/bin/env node
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var types = require("./types");
var routes = require("./routes");

var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost:27017/phrasebook');

var constants = require('./constants');

app.set('view engine', 'pug');
app.locals.basedir = process.argv[4];
// Setup directories for use statically
app.use('/css', express.static("" + __dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
// // app.use('/assets', express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');

// Cookies and sessions setup
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: constants.SECRET,
    saveUninitialized: true,
    resave: true,
    // Store sessions in the mongo instance - oersistant across Phrasebook restarts
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(process.argv[3], routes.router);

app.listen(process.argv[2], "127.0.0.1", () => {
    console.log(`\n${constants.APPNAME} started and listening on port ${process.argv[2]}`);
})
