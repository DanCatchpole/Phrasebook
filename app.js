#!/usr/bin/env node
// node app.js <port> <address> <root of filesystem>
// Address: probably "/phrasebook" or "/phrasebook-dev"
// Root: Is "E://" or "F://" on Windows, "/" on my webserver

var express = require('express');
var app = express();
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
// Setup directories for use statically
console.log(__dirname);
app.use(`${process.argv[3]}/css`, express.static(__dirname + '/css'));
app.use(`${process.argv[3]}/js`, express.static(__dirname + '/js'));
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
    // Store sessions in the mongo instance - persistant across Phrasebook restarts
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(process.argv[3], routes.router);

app.listen(process.argv[2], "127.0.0.1", () => {
    console.log(`\n${constants.APPNAME} started and listening on port ${process.argv[2]}`);
})
