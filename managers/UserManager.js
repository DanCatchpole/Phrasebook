"use strict";
var bcrypt = require('bcrypt-nodejs');
var types = require('../types');

class UserManager {
    validateUser(username, password, callback) {
        // Check if user exists
        types.User.findOne({username: username}, function(err, userObj) {
            if (userObj) {
                bcrypt.compare(password, userObj.password, (err, isValid) => {
                    callback(err, isValid, userObj);
                });
            } else {
                callback(err, false, null);
            }
        });
    }

    createUser(username, firstname, surname, email, password, callback) {
        // Check if user exists
        this.userExists(username, (err, exists) => {
            if (!exists) {
                bcrypt.hash(password, null, null, (err, hash) => {
                    if (err) {
                        callback(err, false);
                    } else {
                        // Create a new user
                        var newUser = new types.User({username: username, firstname: firstname, lastname: surname, email: email,
                                                        password: hash, description: "", profile_icon: "https://dcatcher.me/assets/userIcon.svg", languages: []});
                        // Save the user to the DB
                        newUser.save((err) => {
                            if (err) {
                                callback(err, false);
                            } else {
                                callback(err, true);
                            }
                        })
                    }
                })
            } else {
                callback(err, false);
            }
        });
    }

    userExists(username, callback) {
        var query = types.User.count({username: username});
        query.exec((err, num) => {
            callback(err, (num == 1));
        });
    }

}

module.exports = UserManager;
