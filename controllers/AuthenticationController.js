"use strict";
var {categoryManager, wordManager, userManager} = require('../instantiatemanagers');
var utils = require("../utils");
const APPNAME = "Phrasebook";

class AuthenticationController {
    getLoginPage(req, res) {
        if (!req.session.username) {
                res.render('login', {title: APPNAME + ' - Login', error: ""});
        } else {
            res.redirect("/phrasebook");
        }
    }

    postLogin(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        if (username && password) {
            userManager.validateUser(username, password, (err, valid, userObj) => {
                if (valid) {
                    req.session.username = username;
                    if (userObj.languages.length != 0) {
                        req.session.currentlanguage = userObj.languages[0];
                    }
                    utils.refreshCategoryLists(req, res, (err) => {
                        res.redirect("/phrasebook");
                    });
                } else {
                    res.render('login', { title: APPNAME + ' - Login', error: "Sorry, incorrect username or password"});
                }
            });
        } else {
            res.render('login', { title: APPNAME + ' - Login', error: "Sorry, incorrect username or password"});
        }
    }

    getRegisterPage(req, res) {
        if (!req.session.username) {
            res.render('register', {title: APPNAME + " - Register", error: ""});
        } else {
            res.redirect("/phrasebook");
        }
    }

    postRegister(req, res) {
        var username = req.body.username;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var password = req.body.password;
        var confirmpassword = req.body.confirmpassword;

        if (!req.session.username) {
            if (password != confirmpassword) {
                res.render('register', {title: APPNAME + " - Register", error: "Sorry, the two passwords must be the same"});
            } else if (username && firstname && lastname && email && password && confirmpassword) {
                userManager.createUser(username, firstname, lastname, email, password, (err, created) => {
                    if (created) {
                        res.render('login', { title: APPNAME + ' - Login', error: "Registration was successful! Please log in now"});
                    } else {
                        res.render('register', {title: APPNAME + " - Register", error: "Sorry, this username was taken"});
                    }
                });
            } else {
                res.render('register', {title: APPNAME + " - Register", error: "All details need to be filled in"});
            }
        } else {
            res.redirect("/phrasebook");
        }
    }

    logout(req, res) {
        req.session.regenerate((err) => {
            if (err) {
                console.log(err);
            }
            res.redirect("/phrasebook/login");
        });
    }

}

module.exports = AuthenticationController;
