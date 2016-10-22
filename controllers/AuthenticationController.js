"use strict";
var {categoryManager, wordManager, userManager} = require('../instantiatemanagers');
var utils = require("../utils");
var constants = require("../constants");

var nodemailer = require('nodemailer');
var sendmailTransport = require('nodemailer-sendmail-transport');

var transporter = nodemailer.createTransport(sendmailTransport);
var emailOpts = {
    from: "phrasebook@dcatcher.me",
    to: "phrasebook@dcatcher.me",
    subject: "A new user registered!",
    text: "Username: "
}

class AuthenticationController {
    getLoginPage(req, res) {
        if (!req.session.username) {
                res.render('login', {title: 'Login', error: ""});
        } else {
            res.redirect(constants.URL);
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
                        res.redirect(constants.URL);
                    });
                } else {
                    res.render('login', { title: 'Login', error: "Sorry, incorrect username or password"});
                }
            });
        } else {
            res.render('login', { title: 'Login', error: "Sorry, incorrect username or password"});
        }
    }

    getRegisterPage(req, res) {
        if (!req.session.username) {
            res.render('register', {title: "Register", error: ""});
        } else {
            res.redirect(process.argv[3]);
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
                res.render('register', {title: "Register", error: "Sorry, the two passwords must be the same"});
            } else if (username && firstname && lastname && email && password && confirmpassword) {
                userManager.createUser(username, firstname, lastname, email, password, (err, created) => {
                    if (created) {
                        // User created successfully
                        mailOpts.text += username;
                        transporter.sendMail(mailOpts, (err, info) => {
                            if(err) {
                                console.log(err)
                            }
                            res.render('login', { title: 'Login', error: "Registration was successful! Please log in now"});
                        })

                    } else {
                        res.render('register', {title:"Register", error: "Sorry, this username was taken"});
                    }
                });
            } else {
                res.render('register', {title: "Register", error: "All details need to be filled in"});
            }
        } else {
            res.redirect(constants.URL);
        }
    }

    logout(req, res) {
        req.session.regenerate((err) => {
            if (err) {
                console.log(err);
            }
            res.redirect(constants.URL + "/login");
        });
    }

}

module.exports = AuthenticationController;
