var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var async = require("async");
var types = require("./types");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/phrasebook');
// mongoose.connect('mongodb://localhost:27017/phrasebook');
var routes = require("./routes");


function escapeHtml(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}


// Name of the application
const appName = 'Phrasebook';

// Port the server will be running on
const PORT = 2907;

// Secret key
const SECRET = '4D2EC942A81E627F1EF1EC6B4ACD7';

// Set the view engine to use the jade language
app.set('view engine', 'jade');

// Setup directories for use statically
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));


// Cookies and sessions setup
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: SECRET }));


// Preprocess to get the current user and language details
app.use(function (req, res, next) {
    // If user is logged in + we havent saved to the session before
    if (req.session.username && !req.session.user) {
        types.User.findOne({ username: req.session.username }, function(err, userObj) {
            if (err) {
                next(err);
            } else if (userObj) {
                req.session.user = userObj;
                next();
            } else {
                // Error that there is no such user logged in
                next(new Error("No User found"));
            }
        });
    } else {
        next();
    }
});

// Middleware to handle obtaining the category list + word counts to go along with it
app.use(function (req,res,next) {
    if (req.session.username) {
        // Find all categories for this user
        types.Category.find({username: req.session.username, language: req.session.currentlanguage.shortened}, function(err, categories) {
            if (err) {
                // If we have an error, stop and pass it onto the next middleware
                next(err);
            } else {
                // Run an async foreach loop, for each element in the categories array.
                async.each(categories, function(elem, callback) {
                    // Gather all words for this category - asynchronously ofc...
                    types.Word.count({username: req.session.username, language: req.session.currentlanguage.shortened, category: elem._id}, function(err, c) {
                        if (err) {
                            // If we have an error, pass it to the callback function
                            callback(err);
                        } else {
                            // If not, then add the count to the element in the form of the 'words' property
                            elem.words = c;
                            // Finally callback!
                            callback();
                        }
                    });
                }, function(err) {
                    // This function runs when the entire thing has been completed
                    if (err) {
                        // If one of the things causes an error: we will error onto the next middleware
                        next(err);
                    } else {
                        // Otherwise we have processed all the categories, so we can now save it to the session
                        req.session.categories = categories;
                        // And proceed onto the next middleware
                        next();
                    }
                });
            }
        });
    } else {
        // If the user isn't logged in, then we don't need to perform processing
        next();
    }
});


// Use the dedicated router to handle all incoming 'traffic'
app.use('/', routes.router);



// Show we are now active
app.listen(PORT, function() {
    console.log(`\nApp started and listening on port ${PORT}`);
});
