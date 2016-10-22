"use strict";
var {categoryManager, wordManager, userManager, languageManager} = require('../instantiatemanagers');
var types = require("../types");
var async = require("async");
var utils = require("../utils");

var constants = require("../constants");

class MiddlewareController {
    refreshUserDetails(req, res, next) {
        if (req.session.username) {
            var query = types.User.findOne({username: req.session.username});
            query.exec((err, user) => {
                if (err) {
                    next(err);
                } else if (user) {
                    req.session.user = user;
                    next();
                } else {
                    next(new Error("No such user found"));
                }
            });
        } else {
            next();
        }
    }

    firstLogin(req, res, next) {
        if (req.session.user && req.session.user.languages.length == 0) {
            languageManager.getAllLanguages((error, allLangs) => {
                if (error) {
                    console.log(error);
                    next(error);
                } else {
                    res.render('firstlogin', {title: "Welcome!", u: req.session.user, selected: "newlanguage", s: req.session, allLangs: allLangs}) // TODO
                }
            });
        } else {
            next();
        }
    }

    interceptRender(req, res, next) {
        var _render = res.render;

        res.render = function(view, options, fn) {
            options.constants = constants;
            if (options.title) {
                options.title = constants.APPNAME + " - " + options.title;
            } else {
                options.title = constants.APPNAME;
            }
            _render.call(this, view, options, fn);
        }
        next();
    }

}

module.exports = MiddlewareController;
